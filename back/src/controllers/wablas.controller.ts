import { Request, Response } from "express";
import { catchedController } from "../utils/catchedControllers";
import {
  fetchDeviceInfo,
  fetchMessages,
  sendMessages,
} from "../service/wablas.service";

export const fetchInfoMessages = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const messages = await fetchMessages(userId);
    res.status(201).send(messages);
  }
);

export const fetchMessagesWablas = catchedController(
  async (req: Request, res: Response) => {
    const { message, phones, id } = req.body;
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const response = await sendMessages(message, phones, userId);
    res.status(201).send(response);
  }
);

export const fetchInfoDevices = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const response = await fetchDeviceInfo(id);
   
    if (response === false) {
      return res.json({ message: "No se encontro un token", status: false });
    }
    res.status(201).send(response);
  }
);
