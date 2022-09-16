import { Request, Response } from "express";
import { testService } from "../services";

export const postTest = async (req: Request, res: Response) => {
  await testService.postTest(res.locals.body, res.locals.user);
  res.status(201).send("Created!");
};
