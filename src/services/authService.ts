import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { CreateUserData, CreateUserToken } from "../types/authTypes";
import { conflictError, unauthorizedError } from "../utils/errorUtils";
import { authRepository } from "../repositories";
import { BCRYPTSALT, JWT_EXPIRE_TIME_SECONDS } from "../utils/constantsUtils";
import { Users } from "@prisma/client";

dotenv.config();

export const signUp = async (data: CreateUserData) => {
  const { email, password } = data;
  await checkEmailIsAlreadyRegistered(email);
  const encryptedPassword = encryptPasswordBcrypt(password);
  const userWithEncryptedPassword: CreateUserData = {
    email,
    password: encryptedPassword,
  };
  await authRepository.insertUser(userWithEncryptedPassword);
  return;
};

export const signIn = async (data: CreateUserData) => {
  const { email, password } = data;
  const user: Users = await getEmailThatExists(email);
  checkPasswordsMatch(password, user.password);
  const tokenInfo = {
    userId: user.id,
    email: user.email,
  };
  const token: string = createTokenByJwt(tokenInfo);
  return { token };
};

export const checkEmailIsAlreadyRegistered = async (email: string) => {
  const user = await getUserByEmail(email);
  if (user) throw conflictError("Email is already registered.");
  return false;
};

export const encryptPasswordBcrypt = (password: string) => {
  try {
    const hash = bcrypt.hashSync(password, BCRYPTSALT);
    return hash;
  } catch (error) {
    throw error;
  }
};

export const checkPasswordsMatch = (
  password: string,
  encryptedPassword: string
) => {
  const passwordIsValid = bcrypt.compareSync(password, encryptedPassword);
  if (!passwordIsValid) throw unauthorizedError("Invalid data!");
  return true;
};

export const createTokenByJwt = (data: CreateUserToken) => {
  try {
    const { JWT_SECRETKEY } = process.env;
    const jwtExpire = {
      expiresIn: JWT_EXPIRE_TIME_SECONDS,
    };
    const token = jwt.sign(data, JWT_SECRETKEY!, jwtExpire);
    return token;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await authRepository.getUserByEmail(email);
  return user;
};

export const getEmailThatExists = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) throw unauthorizedError("invalid data!");
  return user;
};

export const getUserById = async (id: number) => {
  const user = await authRepository.getUserById(id);
  if (!user) throw unauthorizedError("Invalid token!");
  return user;
};
