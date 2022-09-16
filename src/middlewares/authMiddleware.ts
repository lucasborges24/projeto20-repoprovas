import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

import { authService } from "../services";
import { unauthorizedError } from "../utils/errorUtils";

export async function ensureAuthenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  if (!authorization) throw unauthorizedError("Missing authorization header");

  const token = authorization.replace("Bearer ", "");
  if (!token) throw unauthorizedError("Missing token");

  try {
    const { JWT_SECRETKEY } = process.env;
    const { userId } = jwt.verify(token, JWT_SECRETKEY!) as { userId: number };
    const user = await authService.getUserById(userId);
    res.locals.user = user;
    next();
  } catch {
    throw unauthorizedError("Invalid token");
  }
}
