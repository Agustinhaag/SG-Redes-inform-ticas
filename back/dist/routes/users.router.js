"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegister_middleware_1 = require("../middlewares/userRegister.middleware");
const user_controller_1 = require("../controllers/user.controller");
const userLogin_middleware_1 = require("../middlewares/userLogin.middleware");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const usersRouter = (0, express_1.Router)();
usersRouter.post("/signup", userRegister_middleware_1.validateUserRegister, userRegister_middleware_1.validateUserExists, user_controller_1.userRegister);
usersRouter.post("/signin", userLogin_middleware_1.validateLogin, user_controller_1.userLogin);
usersRouter.post("/password-reset", user_controller_1.initiatePasswordReset);
usersRouter.post("/addDevice", checkLogin_middleware_1.default, user_controller_1.addDevice);
usersRouter.post("/reset-password", user_controller_1.resetPassword);
usersRouter.get("/users/:id", checkLogin_middleware_1.default, user_controller_1.getUserById);
exports.default = usersRouter;
