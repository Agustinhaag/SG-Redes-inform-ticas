import { Request, Response } from "express";
import { catchedController } from "../utils/catchedControllers";
import {
  findUserById,
  initiatePasswordResetService,
  loginUserService,
  registerUserService,
  resetPasswordService,
} from "../service/user.service";
import { User } from "../entities/User";

export const userRegister = catchedController(
  async (req: Request, res: Response) => {
    const { email, password, name, surname, phone } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      surname,
      phone,
    });
    res.status(201).send({ register: true });
  }
);

export const userLogin = catchedController(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await loginUserService({
      email,
      password,
    });
    res.status(201).send({ token, login: true });
  }
);

export const initiatePasswordReset = catchedController(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const message = await initiatePasswordResetService(email);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export const resetPassword = catchedController(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;
      const message = await resetPasswordService(token, newPassword);

      res.status(200).json({ message });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export const getUserById = catchedController(
  async (req: Request, res: Response): Promise<any> => {
    const id = Number(req.params.id);
    const user: User = await findUserById(id);
    res.status(200).json(user);
  }
);
