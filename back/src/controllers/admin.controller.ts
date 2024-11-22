import { User } from "../entities/User";
import {
  findAllUsers,
  toggleUserStatusService,
} from "../service/admin.service";
import { catchedController } from "../utils/catchedControllers";
import { Request, Response } from "express";

export const getAllUsers = catchedController(
  async (req: Request, res: Response) => {
    const users: User[] = await findAllUsers();
    res.status(200).json(users);
  }
);

export const toggleStatusUser = catchedController(
  async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    const newStatus = await toggleUserStatusService(userId);

    res.status(200).json({
      message: `Estado del usuario actualizado a: ${newStatus}`,
    });
  }
);