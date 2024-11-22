import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import { checkUserExists } from "../service/user.service";

export const validateUserRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name, surname} =
    req.body;
  if (
    !email ||
    !password ||
    !name ||
    !surname 
  )
    next(new ClientError("Debe enviar todos los campos requeridos",400));
  else next();
};

export const validateUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  if (await checkUserExists(email))
    next(new ClientError("El usuario ya existe", 400));
  else next();
};
