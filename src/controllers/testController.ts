import { Request, Response } from "express";
import { testService } from "../services";

export const postTest = async (req: Request, res: Response) => {
  const newTest = await testService.postTest(res.locals.body, res.locals.user);
  // res.status(201).send("Created!");
  res.status(201).send(newTest);
};
