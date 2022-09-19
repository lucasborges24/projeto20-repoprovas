import prisma from "../database";
import { CreateTestsData } from "../types/testTypes";

export const insertTest = async (data: CreateTestsData) => {
  const test = await prisma.tests.create({
    data,
  });
  return test;
};

export const findCategoryByName = async (categoryName: string) => {
  const category = await prisma.categories.findFirst({
    where: {
      name: categoryName,
    },
  });
  return category;
};

export const findTeacherDisciplineByTeacherAndDisciplineId = async (
  teacherId: number,
  disciplineId: number
) => {
  const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
    where: {
      teacherId: teacherId,
      disciplineId: disciplineId,
    },
  });
  return teacherDiscipline;
};

export const findTeacherByName = async (teacherName: string) => {
  const teacher = await prisma.teachers.findUnique({
    where: {
      name: teacherName,
    },
  });
  return teacher;
};

export const findDisciplineByName = async (disciplineName: string) => {
  const discipline = await prisma.disciplines.findUnique({
    where: {
      name: disciplineName,
    },
  });
  return discipline;
};

export const getTestByDiscipline = async () => {
  const tests = prisma.terms.findMany({
    include: {
      Disciplines: {
        select: {
          id: true,
          name: true,
          TeachersDisciplines: {
            distinct: ["teacherId"],
            select: {
              teacher: {
                select: { id: true, name: true },
              },
              Tests: {
                // distinct: ["categoryId"],
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
  return tests;
};

export const getTestsByTeacher = async () => {
  const tests = await prisma.teachers.findMany({
    include: {
      TeachersDisciplines: {
        distinct: ["disciplineId"],
        select: {
          discipline: {
            select: { id: true, name: true },
          },
          Tests: {
            select: {
              id: true,
              name: true,
              pdfUrl: true,
              category: true,
            },
          },
        },
      },
    },
  });
  return tests;
};
