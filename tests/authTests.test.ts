import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/database";
import { signInFactory, signUpFactory } from "./factories/authFactory";

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /signup", () => {
  it("Create user with statusCode 201", async () => {
    const user = signUpFactory();

    const result = await supertest(app).post("/signup").send(user);
    expect(result.status).toBe(201);
  });

  it("Try to Create user with duplicate email with StatusCode 409", async () => {
    const user = signUpFactory();

    await supertest(app).post("/signup").send(user);
    const result = await supertest(app).post("/signup").send(user);

    expect(result.status).toBe(409);
  });
});

describe("POST /signin", () => {
  it("Do Signin with StatusCode 202 and Token in Response", async () => {
    const user = signUpFactory();

    await supertest(app).post("/signup").send(user);
    delete user.confirmPassword;
    const result = await supertest(app).post("/signin").send(user);
    
    expect(result.status).toBe(202)
    expect(result.body).toBeInstanceOf(Object)
  });

  it("Do signin with wrong password/email with StatusCode 401", async () => {
    const user = signInFactory()

    const result = await supertest(app).post("/signin").send(user);

    expect(result.status).toBe(401)
  })
});
