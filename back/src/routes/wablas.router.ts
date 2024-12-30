import { Router } from "express";
import checkLogin from "../middlewares/checkLogin.middleware";
import {
  fetchInfoDevices,
  fetchInfoMessages,
  fetchMessagesWablas,
} from "../controllers/wablas.controller";

const wablasRouter = Router();

wablasRouter.post("/fetchInfo", checkLogin, fetchInfoMessages);

wablasRouter.post("/sendMessage", checkLogin, fetchMessagesWablas);

wablasRouter.post("/infoDevice", checkLogin, fetchInfoDevices);

export default wablasRouter;
