import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password)
    next(new ClientError("Debe enviar todos los campos requeridos", 400));
  else next();
};
