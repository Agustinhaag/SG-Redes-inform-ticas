import { Request, Response } from "express";
import { catchedController } from "../utils/catchedControllers";
import {
  fetchCampaignsByUser,
  handleChangeStatus,
} from "../service/campaign.service";

export const fetchCampaign = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const campaign = await fetchCampaignsByUser(userId);
    res.status(201).send(campaign);
  }
);

export const changeStatus = catchedController(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
   
    const campaign = await handleChangeStatus(id, status);
    res.status(201).send(campaign);
  }
);
