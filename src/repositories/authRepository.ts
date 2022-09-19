import prisma from "../database";
import { CreateUserData } from "../types/authTypes";

export const insertUser = async (data: CreateUserData) => {
  const newUser = await prisma.users.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const getUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return user;
};
