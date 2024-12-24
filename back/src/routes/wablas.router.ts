import { Router } from "express";
import checkLogin from "../middlewares/checkLogin.middleware";
import {
  fetchInfoMessages,
  fetchMessagesWablas,
} from "../controllers/wablas.controller";

const wablasRouter = Router();

wablasRouter.post("/fetchInfo", checkLogin, fetchInfoMessages);

wablasRouter.post("/sendMessage", checkLogin, fetchMessagesWablas);

export default wablasRouter;
