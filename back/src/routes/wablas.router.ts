import { Router } from "express";
import checkLogin from "../middlewares/checkLogin.middleware";
import {
  fetchInfoMessages,
  fetchMessagesWablas,
  scanQrCode,
} from "../controllers/wablas.controller";

const wablasRouter = Router();

wablasRouter.get("/fetchInfo", checkLogin, fetchInfoMessages);

wablasRouter.post("/sendMessage", checkLogin, fetchMessagesWablas);

wablasRouter.post("/scanqr", checkLogin, scanQrCode);

export default wablasRouter;
