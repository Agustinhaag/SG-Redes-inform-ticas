"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ispCube_controller_1 = require("../controllers/ispCube.controller");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const ispCubeRouter = (0, express_1.Router)();
ispCubeRouter.post("/login", checkLogin_middleware_1.default, ispCube_controller_1.loginIspCube);
ispCubeRouter.post("/users", checkLogin_middleware_1.default, ispCube_controller_1.getUsersFromIspCubeController);
ispCubeRouter.post("/fact", checkLogin_middleware_1.default, ispCube_controller_1.fetchFactController);
exports.default = ispCubeRouter;
