import { Teachers, Users } from "@prisma/client";
import { testRepository } from "../repositories";
import { CreateTestsData, TestsBody } from "../types/testTypes";
import { notFoundError } from "../utils/errorUtils";

export const postTest = async (body: TestsBody) => {
  const { id: categoryId } = await getCategoryByName(body.category);
  const { id: teacherDisciplineId } =
    await getTeacherDisciplineByTeacherAndDisciplineName(
      body.teacher,
      body.discipline
    );
  const createTest: CreateTestsData = {
    name: body.name,
    pdfUrl: body.pdfUrl,
    categoryId,
    teacherDisciplineId,
  };
  const newTest = await testRepository.insertTest(createTest);
  return newTest;
};

export const getTestByDiscipline = async () => {
  const tests = await testRepository.getTestByDiscipline();
  return tests;
};

export const getTestByTeacher = async () => {
  const tests = await testRepository.getTestsByTeacher();
  return tests;
};

export const getTeacherDisciplineByTeacherAndDisciplineName = async (
  teacherName: string,
  disciplineName: string
) => {
  const { id: teacherId } = await getTeacherByName(teacherName);
  const { id: disciplineId } = await getDisciplineByName(disciplineName);
  const teacherDiscipline =
    await testRepository.findTeacherDisciplineByTeacherAndDisciplineId(
      teacherId,
      disciplineId
    );
  if (!teacherDiscipline)
    throw notFoundError("Teacher is not vinculated to Discipline.");
  return teacherDiscipline;
};

export const getTeacherByName = async (teacherName: string) => {
  const teacher = await testRepository.findTeacherByName(teacherName);
  if (!teacher) throw notFoundError("Teacher doesn't exist!");
  return teacher;
};

export const getDisciplineByName = async (disciplineName: string) => {
  const discipline = await testRepository.findDisciplineByName(disciplineName);
  if (!discipline) throw notFoundError("Discipline doesn't exist!");
  return discipline;
};

export const getCategoryByName = async (name: string) => {
  const category = await testRepository.findCategoryByName(name);
  if (!category) throw notFoundError("category doesn't exist!");
  return category;
};
