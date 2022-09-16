import { faker } from "@faker-js/faker";

interface bodyAuth {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const signUpFactory = () => {
  const password = faker.random.alphaNumeric(10);
  const body: bodyAuth = {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
  return body;
};

export const signInFactory = () => {
  const body: bodyAuth = {
    email: faker.internet.email(),
    password: faker.random.alpha(),
  };
  return body;
};
