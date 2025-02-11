"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const checkLogin_middleware_1 = __importDefault(require("../middlewares/checkLogin.middleware"));
const adminRouter = (0, express_1.Router)();
adminRouter.get("/", checkLogin_middleware_1.default, admin_controller_1.getAllUsers);
adminRouter.put("/toggle-status/:id", checkLogin_middleware_1.default, admin_controller_1.toggleStatusUser);
adminRouter.post("/addToken/:id", checkLogin_middleware_1.default, admin_controller_1.addToken);
exports.default = adminRouter;
