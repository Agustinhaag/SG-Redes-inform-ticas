import { Router } from "express";
import checkLogin from "../middlewares/checkLogin.middleware";
import {
  changeStatus,
  fetchCampaign,
} from "../controllers/campaign.controller";

const campaignRouter = Router();

campaignRouter.post("/", checkLogin, fetchCampaign);

campaignRouter.post("/status/:id", checkLogin, changeStatus);

export default campaignRouter;
