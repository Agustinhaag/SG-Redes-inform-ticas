import { Router } from "express";
import checkLogin from "../middlewares/checkLogin.middleware";
import { fetchInfoMessages, sendMessages } from "../controllers/wablas.controller";

const wablasRouter = Router()

wablasRouter.get("/fetchInfo", checkLogin, fetchInfoMessages)

wablasRouter.post("/sendMessage", checkLogin, sendMessages)

export default wablasRouter