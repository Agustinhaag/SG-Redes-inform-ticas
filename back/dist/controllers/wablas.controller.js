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
exports.fetchInfoDevices = exports.fetchMessagesWablas = exports.fetchInfoMessages = void 0;
const catchedControllers_1 = require("../utils/catchedControllers");
const wablas_service_1 = require("../service/wablas.service");
exports.fetchInfoMessages = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const userId = parseInt(id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const messages = yield (0, wablas_service_1.fetchMessages)(userId);
    res.status(201).send(messages);
}));
exports.fetchMessagesWablas = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, phones, id, tokenIspCube, email } = req.body;
    const userId = parseInt(id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: "ID de usuario inválido" });
    }
    const response = yield (0, wablas_service_1.sendMessages)(message, phones, userId, tokenIspCube, email);
    res.status(201).send(response);
}));
exports.fetchInfoDevices = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const response = yield (0, wablas_service_1.fetchDeviceInfo)(id);
    if (response === false) {
        return res.json({ message: "No se encontro un token", status: false });
    }
    res.status(201).send(response);
}));
