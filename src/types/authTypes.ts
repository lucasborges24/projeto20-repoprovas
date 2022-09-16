import { Users } from "@prisma/client";

export type CreateUserData = Omit<Users, "id">;

export interface CreateUserToken {
  userId: number;
  email: string;
}
