import { Router } from "express";
import {
  getUsersFromIspCubeController,
  loginIspCube,
} from "../controllers/ispCube.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const ispCubeRouter = Router();

ispCubeRouter.post("/login", checkLogin, loginIspCube);

ispCubeRouter.post("/users", checkLogin, getUsersFromIspCubeController);

export default ispCubeRouter;
