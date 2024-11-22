import { Router } from "express";
import { getAllUsers, toggleStatusUser } from "../controllers/admin.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const adminRouter = Router();

adminRouter.get("/", checkLogin, getAllUsers);

adminRouter.put("/toggle-status/:id", checkLogin, toggleStatusUser);

export default adminRouter;
