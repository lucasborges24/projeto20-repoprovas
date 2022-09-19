import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signUpFactory } from "./authFactory";
import supertest from "supertest";
import app from "../../src/app";

dotenv.config();

interface testData {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

export const getValidToken = async () => {
  const user = signUpFactory();
  await supertest(app).post("/signup").send(user);
  delete user.confirmPassword;
  const token = await supertest(app).post("/signin").send(user);
  return token.body.token;
};

export const createTest = () => {
  const testObject: testData = {
    name: faker.lorem.word(2),
    pdfUrl: faker.internet.url(),
    category: "Recuperação",
    discipline: "HTML e CSS",
    teacher: "Diego Pinho",
  };
  return testObject;
};

export const createInvalidTeacherDisciplineTest = () => {
  const testObject: testData = {
    name: faker.name.fullName(),
    pdfUrl: faker.internet.url(),
    category: "Recuperação",
    discipline: "Autoconfiança",
    teacher: "Diego Pinho",
  };
  return testObject;
};

export const expectedPostObject = () => {
  return {
    id: expect.any(Number),
    name: expect.any(String),
    pdfUrl: expect.any(String),
    categoryId: expect.any(Number),
    teacherDisciplineId: expect.any(Number),
  };
};
