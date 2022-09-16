import { Router } from "express";
import { ensureAuthenticatedMiddleware } from "../middlewares/authMiddleware";
import authRouter from "./authRoute";
import testRouter from "./testRoute";

const router = Router();

router.use(authRouter);
router.use(ensureAuthenticatedMiddleware);
router.use(testRouter);

export default router;
