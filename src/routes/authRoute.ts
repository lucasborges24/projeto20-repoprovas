import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(signUpSchema), () => console.log('oi') );
authRouter.post("/signin", validateSchemaMiddleware(signInSchema));

export default authRouter;
