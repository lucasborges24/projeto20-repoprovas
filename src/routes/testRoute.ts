import { Router } from "express";
import { testController } from "../controllers";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRouter = Router();

testRouter.post(
  "/test",
  validateSchemaMiddleware(testSchema),
  testController.postTest
);

export default testRouter;
