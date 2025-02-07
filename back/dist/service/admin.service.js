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
exports.addNewToken = exports.findAllUsers = exports.toggleUserStatusService = void 0;
const dataSource_1 = require("../config/dataSource");
const hashPropsHeader_1 = require("../helpers/hashPropsHeader");
const errors_1 = require("../utils/errors");
const types_1 = require("../utils/types");
const toggleUserStatusService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({ where: { id: userId } });
        if (!user) {
            throw new errors_1.ClientError("Usuario no encontrado", 404);
        }
        // Alternar estado
        user.status =
            user.status === types_1.Status.ACTIVE ? types_1.Status.SUSPENDED : types_1.Status.ACTIVE;
        // Guardar cambios
        yield dataSource_1.userModel.save(user);
        return user.status;
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("No se pudo modificar el estado del usuario", 500);
    }
});
exports.toggleUserStatusService = toggleUserStatusService;
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield dataSource_1.userModel.find({ where: { role: types_1.Role.USER } });
        return users;
    }
    catch (error) {
        throw new errors_1.ClientError("No se pudo recuperar la informaciòn de todos los usuarios", 500);
    }
});
exports.findAllUsers = findAllUsers;
const addNewToken = (userId, apikey, deviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({ where: { id: userId } });
        if (!user) {
            throw new errors_1.ClientError("Usuario no encontrado", 404);
        }
        if (user.tokenwablas) {
            throw new errors_1.ClientError("El usuario ya posee un token", 400);
        }
        user.tokenwablas = (0, hashPropsHeader_1.encrypt)(apikey);
        user.deviceid = deviceId;
        yield dataSource_1.userModel.save(user);
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("No se pudo agregar el token", 500);
    }
});
exports.addNewToken = addNewToken;
