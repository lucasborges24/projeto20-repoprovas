import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/database";
import { signUpFactory } from "./factories/authFactory";
import {
  createInvalidTeacherDisciplineTest,
  createTest,
  expectedPostObject,
  getValidToken,
} from "./factories/testsFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /test", () => {
  it("should create a post and return it with status 201", async () => {
    const test = createTest();
    const token = await getValidToken();
    const result = await supertest(app)
      .post("/test")
      .send(test)
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(201);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toMatchObject(
      expect.objectContaining(expectedPostObject())
    );
  });

  it("should return status 404 to invalid teacher/discipline relationship", async () => {
    const test = createInvalidTeacherDisciplineTest();
    const token = await getValidToken();
    const result = await supertest(app)
      .post("/test")
      .send(test)
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(404);
    expect(result.text).toBe("Teacher is not vinculated to Discipline.");
  });
});

describe("GET /test/discipline", () => {
  it("Get tests by discipline with statusCode 200", async () => {
    const token = await getValidToken();
    const result = await supertest(app)
      .get("/test/discipline")
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe("GET /test/teachers", () => {
  it("Get tests by teachers with statusCode 200", async () => {
    const token = await getValidToken();
    const result = await supertest(app)
      .get("/test/teacher")
      .set({ Authorization: `Bearer ${token}` });
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
