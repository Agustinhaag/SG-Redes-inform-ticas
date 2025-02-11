"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_router_1 = __importDefault(require("./users.router"));
const admin_router_1 = __importDefault(require("./admin.router"));
const ispCube_router_1 = __importDefault(require("./ispCube.router"));
const wablas_router_1 = __importDefault(require("./wablas.router"));
const router = (0, express_1.Router)();
router.use("/auth", users_router_1.default);
router.use("/admin", admin_router_1.default);
router.use("/ispCube", ispCube_router_1.default);
router.use("/wablas", wablas_router_1.default);
exports.default = router;
