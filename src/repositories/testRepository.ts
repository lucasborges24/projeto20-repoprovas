import prisma from "../database";
import { CreateTestsData } from "../types/testTypes";

export const insertTest = async (data: CreateTestsData) => {
  const test = await prisma.tests.create({
    data,
  });
  return test;
};
