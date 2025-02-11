"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToken = exports.toggleStatusUser = exports.getAllUsers = void 0;
const admin_service_1 = require("../service/admin.service");
const catchedControllers_1 = require("../utils/catchedControllers");
exports.getAllUsers = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, admin_service_1.findAllUsers)();
    res.status(200).json(users);
}));
exports.toggleStatusUser = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const newStatus = yield (0, admin_service_1.toggleUserStatusService)(userId);
    res.status(200).json({
        message: `Estado del usuario actualizado a: ${newStatus}`,
    });
}));
exports.addToken = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { apikey, deviceId } = req.body;
    const userId = parseInt(id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
    }
    yield (0, admin_service_1.addNewToken)(userId, apikey, deviceId);
    res.status(200).json({
        message: "Se ha añadido el token correctamente",
    });
}));
