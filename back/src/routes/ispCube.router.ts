import { Router } from "express";
import {
  fetchFactController,
  getUsersFromIspCubeController,
  loginIspCube,
} from "../controllers/ispCube.controller";
import checkLogin from "../middlewares/checkLogin.middleware";

const ispCubeRouter = Router();

ispCubeRouter.post("/login", checkLogin, loginIspCube);

ispCubeRouter.post("/users", checkLogin, getUsersFromIspCubeController);

ispCubeRouter.post("/fact", checkLogin, fetchFactController);

export default ispCubeRouter;
