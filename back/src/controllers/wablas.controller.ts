import { Request, Response } from "express";
import { catchedController } from "../utils/catchedControllers";
import { fetchMessages } from "../service/wablas.service";

export const fetchInfoMessages = catchedController(
    async(req: Request,
        res: Response)=>{
      const messages = await fetchMessages()
      res.status(201).send(messages);
    }
)

export const sendMessages = catchedController(
    async(req: Request,
        res: Response)=>{
      
    }
)