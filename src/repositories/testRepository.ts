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
