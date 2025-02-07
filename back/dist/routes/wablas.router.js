"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const wablas_controller_1 = require("../controllers/wablas.controller");
const wablasRouter = (0, express_1.Router)();
wablasRouter.post("/fetchInfo", checkLogin_middleware_1.default, wablas_controller_1.fetchInfoMessages);
wablasRouter.post("/sendMessage", checkLogin_middleware_1.default, wablas_controller_1.fetchMessagesWablas);
wablasRouter.post("/infoDevice", checkLogin_middleware_1.default, wablas_controller_1.fetchInfoDevices);
exports.default = wablasRouter;
