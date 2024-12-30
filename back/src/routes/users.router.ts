import { Router } from "express";
import {
  validateUserRegister,
  validateUserExists,
} from "../middlewares/userRegister.middleware";
import {
  addDevice,
  getUserById,
  initiatePasswordReset,
  resetPassword,
  userLogin,
  userRegister,
} from "../controllers/user.controller";
import { validateLogin } from "../middlewares/userLogin.middleware";
import checkLogin from "../middlewares/checkLogin.middleware";

const usersRouter = Router();

usersRouter.post(
  "/signup",
  validateUserRegister,
  validateUserExists,
  userRegister
);

usersRouter.post("/signin", validateLogin, userLogin);

usersRouter.post("/password-reset", initiatePasswordReset);

usersRouter.post("/addDevice", checkLogin, addDevice);

usersRouter.post("/reset-password", resetPassword);

usersRouter.get("/users/:id", checkLogin, getUserById);

export default usersRouter;
