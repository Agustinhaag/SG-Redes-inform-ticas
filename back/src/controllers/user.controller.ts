import { Request, Response } from "express";
import { catchedController } from "../utils/catchedControllers";
import {
  findUserById,
  initiatePasswordResetService,
  loginUserService,
  registerUserService,
  resetPasswordService,
  saveDevice,
} from "../service/user.service";
import { User } from "../entities/User";
import { ClientError } from "../utils/errors";

export const userRegister = catchedController(
  async (req: Request, res: Response) => {
    const {
      email,
      password,
      name,
      surname,
      phone,
      role,
      deviceid,
      tokenwablas,
    } = req.body;
    const newUser = await registerUserService({
      email,
      password,
      name,
      surname,
      phone,
      role,
      deviceid,
      tokenwablas,
    });
    res.status(201).send({ register: true });
  }
);

export const userLogin = catchedController(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data: any = await loginUserService({
      email,
      password,
    });
    res
      .status(201)
      .send({ token: data.token, login: true, userStatus: data.user.status });
  }
);

export const initiatePasswordReset = catchedController(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      const message = await initiatePasswordResetService(email);
      res.status(200).json({ message });
    } catch (error) {
      // Si el error tiene un código 404, se indica que el usuario no existe
      if (error instanceof ClientError && error.statusCode === 404) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error interno del servidor." });
      }
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

export const addDevice = catchedController(
  async (req: Request, res: Response): Promise<any> => {
    const { id, device } = req.body;
    const user = await saveDevice(id, device);
    res
      .status(200)
      .json({ message: "Dispositivo guardado correctamente", user });
  }
);
