import { Request, Response } from "express";
import { testService } from "../services";

export const postTest = async (req: Request, res: Response) => {
  const newTest = await testService.postTest(res.locals.body);
  // res.status(201).send("Created!");
  res.status(201).send(newTest);
};

export const getTestByDiscipline = async (req: Request, res: Response) => {
  const tests = await testService.getTestByDiscipline();
  res.status(200).send(tests);
};

export const getTestByTeacher = async (req: Request, res: Response) => {
  const tests = await testService.getTestByTeacher();
  res.status(200).send(tests);
};
