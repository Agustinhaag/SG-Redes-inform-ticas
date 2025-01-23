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
exports.addDevice = exports.getUserById = exports.resetPassword = exports.initiatePasswordReset = exports.userLogin = exports.userRegister = void 0;
const catchedControllers_1 = require("../utils/catchedControllers");
const user_service_1 = require("../service/user.service");
exports.userRegister = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, surname, phone, role, deviceid, tokenwablas, } = req.body;
    const newUser = yield (0, user_service_1.registerUserService)({
        email,
        password,
        name,
        surname,
        phone,
        role,
        deviceid,
        tokenwablas,
    });
    res.status(201).send({ register: true });
}));
exports.userLogin = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const token = yield (0, user_service_1.loginUserService)({
        email,
        password,
    });
    res.status(201).send({ token, login: true });
}));
exports.initiatePasswordReset = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const message = yield (0, user_service_1.initiatePasswordResetService)(email);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.resetPassword = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, newPassword } = req.body;
        const message = yield (0, user_service_1.resetPasswordService)(token, newPassword);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.getUserById = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const user = yield (0, user_service_1.findUserById)(id);
    res.status(200).json(user);
}));
exports.addDevice = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, device } = req.body;
    const user = yield (0, user_service_1.saveDevice)(id, device);
    res
        .status(200)
        .json({ message: "Dispositivo guardado correctamente", user });
}));
