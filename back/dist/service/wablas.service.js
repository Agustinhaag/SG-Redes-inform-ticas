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
exports.fetchDeviceInfo = exports.sendMessages = exports.fetchMessages = void 0;
const dataSource_1 = require("../config/dataSource");
const envs_1 = require("../config/envs");
const hashPropsHeader_1 = require("../helpers/hashPropsHeader");
const helperSendMessage_1 = require("../helpers/helperSendMessage");
const errors_1 = require("../utils/errors");
const ispCube_service_1 = require("./ispCube.service");
const user_service_1 = require("./user.service");
const hashRevertToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({ where: { id: userId } });
        if (!user) {
            throw new errors_1.ClientError("Usuario no encontrado", 404);
        }
        if (!user.tokenwablas) {
            return null;
        }
        else {
            return (0, hashPropsHeader_1.decrypt)(user.tokenwablas);
        }
    }
    catch (error) {
        throw new errors_1.ClientError("Error al decifrar el token", 500);
    }
});
const fetchMessages = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield hashRevertToken(userId);
        if (token) {
            const response = yield fetch(`${envs_1.URL_WABLAS}/report-realtime`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            });
            const data = yield response.json();
            return data;
        }
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("Error al obtener los mensajes", 500);
    }
});
exports.fetchMessages = fetchMessages;
const sendMessages = (message, phones, userId, tokenIspCube, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Filtrar números de teléfono válidos
        const validPhones = phones.filter((phone) => phone !== undefined && phone !== "undefined");
        if (validPhones.length === 0) {
            throw new errors_1.ClientError("No hay números válidos para enviar mensajes.", 400);
        }
        // Responder inmediatamente al frontend después de validar los números
        const response = {
            message: "Datos recibidos correctamente. El proceso de envío se está gestionando.",
        };
        // Después de la validación, ejecutamos el resto del proceso en segundo plano
        processMessagesInBackground(message, validPhones, userId, tokenIspCube, email);
        return response; // Respuesta inmediata al frontend
    }
    catch (error) {
        console.error("Error en la validación o en la inicialización:", error);
        throw new errors_1.ClientError("Error al procesar los mensajes", 500);
    }
});
exports.sendMessages = sendMessages;
// Función para procesar el envío de mensajes en segundo plano
const processMessagesInBackground = (message, phones, userId, tokenIspCube, email) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Obtener información del usuario y los usuarios de IspCube
        const user = yield (0, user_service_1.findByEmail)(email);
        const usersIspCube = yield (0, ispCube_service_1.getUsersFromIspCubeService)(tokenIspCube, user);
        // Filtrar usuarios seleccionados
        const usersSelected = usersIspCube.filter((user) => phones.some((phone) => { var _a; return ((_a = user.phones[0]) === null || _a === void 0 ? void 0 : _a.number) === phone; }));
        if (usersSelected.length === 0) {
            throw new errors_1.ClientError("No se encontraron usuarios seleccionados.", 404);
        }
        // Obtener facturas personalizadas
        const invoices = yield (0, helperSendMessage_1.handleDataIspcube)(tokenIspCube, user, usersSelected);
        // Personalizar mensajes y enviar uno por uno
        const results = [];
        for (const userSelected of usersSelected) {
            const personalizedMessage = (0, helperSendMessage_1.personalizeMessage)(message, userSelected, invoices);
            const phone = (_a = userSelected.phones[0]) === null || _a === void 0 ? void 0 : _a.number;
            const token = yield hashRevertToken(userId);
            if (!token) {
                throw new errors_1.ClientError("Error al obtener el token de Wablas.", 500);
            }
            const dataSend = new URLSearchParams({
                phone,
                message: personalizedMessage,
            }).toString();
            try {
                const response = yield fetch(`${envs_1.URL_WABLAS}/send-message`, {
                    method: "POST",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: dataSend,
                });
                const data = yield response.json();
                if (!response.ok) {
                    throw new Error((data === null || data === void 0 ? void 0 : data.error) || "Error al enviar mensaje.");
                }
                results.push({ phone, status: "success", response: data });
            }
            catch (err) {
                console.error(`Error enviando a ${phone}:`, err.message);
                results.push({ phone, status: "error", error: err.message });
            }
        }
    }
    catch (error) {
        console.error("Error en el proceso en segundo plano:", error);
        // Aquí puedes agregar un sistema de notificación o guardar el error en un log
    }
});
const fetchDeviceInfo = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield hashRevertToken(userId);
        if (!token) {
            return false;
        }
        const response = yield fetch(`${envs_1.URL_WABLAS}/device/info?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = yield response.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.fetchDeviceInfo = fetchDeviceInfo;
