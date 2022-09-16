import prisma from "../src/database";

interface DisciplineObject {
  name: string;
  termId: number;
}
interface TeachersDisciplinesObject {
  teacherId: number;
  disciplineId: number;
}

const termsData = (): number[] => {
  return [1, 2, 3, 4, 5, 6];
};

const categoriesData = (): string[] => {
  return ["Projeto", "Prática", "Recuperação"];
};

const teachersData = (): string[] => {
  return ["Diego Pinho", "Bruna Hamori"];
};

const disciplinesData = (): DisciplineObject[] => {
  return [
    {
      name: "HTML e CSS",
      termId: 1,
    },
    {
      name: "JavaScript",
      termId: 2,
    },
    {
      name: "React",
      termId: 3,
    },
    {
      name: "Humildade",
      termId: 1,
    },
    {
      name: "Planejamento",
      termId: 2,
    },
    {
      name: "Autoconfiança",
      termId: 3,
    },
  ];
};

const teachersDisciplinesData = (): TeachersDisciplinesObject[] => {
  return [
    {
      teacherId: 1,
      disciplineId: 1,
    },
    {
      teacherId: 1,
      disciplineId: 2,
    },
    {
      teacherId: 1,
      disciplineId: 3,
    },
    {
      teacherId: 2,
      disciplineId: 4,
    },
    {
      teacherId: 2,
      disciplineId: 5,
    },
    {
      teacherId: 2,
      disciplineId: 6,
    },
  ];
};

async function main() {
  await Promise.all(
    termsData().map(async (item) => {
      await prisma.terms.upsert({
        where: {
          number: item,
        },
        update: {},
        create: { number: item },
      });
    })
  );

  await Promise.all(
    categoriesData().map(async (item) => {
      await prisma.categories.upsert({
        where: {
          name: item,
        },
        update: {},
        create: {
          name: item,
        },
      });
    })
  );

  await Promise.all(
    teachersData().map(async (teacher) => {
      await prisma.teachers.upsert({
        where: {
          name: teacher,
        },
        update: {},
        create: {
          name: teacher,
        },
      });
    })
  );

  await Promise.all(
    disciplinesData().map(async (discipline) => {
      await prisma.disciplines.upsert({
        where: {
          name: discipline.name,
        },
        update: {},
        create: {
          name: discipline.name,
          termId: discipline.termId,
        },
      });
    })
  );

  await Promise.all(
    teachersDisciplinesData().map(async (teacherDiscipline, index) => {
      await prisma.teachersDisciplines.upsert({
        where: {
          id: index,
        },
        update: {},
        create: {
          teacherId: teacherDiscipline.teacherId,
          disciplineId: teacherDiscipline.disciplineId,
        },
      });
    })
  );
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
