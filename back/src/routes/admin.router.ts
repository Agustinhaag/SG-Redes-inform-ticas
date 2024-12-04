import { Router } from "express";
import {
  addToken,
  getAllUsers,
  toggleStatusUser,
} from "../controllers/admin.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const adminRouter = Router();

adminRouter.get("/", checkLogin, getAllUsers);

adminRouter.put("/toggle-status/:id", checkLogin, toggleStatusUser);

adminRouter.post("/addToken/:id", checkLogin, addToken);

export default adminRouter;
