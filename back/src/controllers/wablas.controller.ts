import { Request, Response } from "express";
import { catchedController } from "../utils/catchedControllers";
import {
  fetchMessages,
  fetchQrCode,
  sendMessages,
} from "../service/wablas.service";

export const fetchInfoMessages = catchedController(
  async (req: Request, res: Response) => {
    const messages = await fetchMessages();
    res.status(201).send(messages);
  }
);

export const fetchMessagesWablas = catchedController(
  async (req: Request, res: Response) => {
    const { message, phones } = req.body;
    const response = await sendMessages(message, phones);
    res.status(201).send(response);
  }
);

export const scanQrCode = catchedController(
  async (req: Request, res: Response) => {
    const response = await fetchQrCode();
    res.status(201).send(response);
  }
);
