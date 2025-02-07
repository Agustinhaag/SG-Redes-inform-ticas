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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.factFetchLink = exports.getUsersFromIspCubeService = exports.loginIspCubeService = exports.fetchLoginIspCube = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const errors_1 = require("../utils/errors");
const envs_1 = require("../config/envs");
const dataSource_1 = require("../config/dataSource");
const user_service_1 = require("./user.service");
const hashPropsHeader_1 = require("../helpers/hashPropsHeader");
const fetchLoginIspCube = (propsFetchUsersIspCube) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(`${envs_1.ISPCUBEURL}/api/sanctum/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "api-key": propsFetchUsersIspCube.apiKey,
                "client-id": propsFetchUsersIspCube.clientId,
                "login-type": "api",
            },
            body: JSON.stringify({
                username: propsFetchUsersIspCube.username,
                password: propsFetchUsersIspCube.passwordIspCube,
            }),
        });
        if (!response.ok) {
            throw new errors_1.ClientError(`Error al iniciar sesión: ${response.statusText}`, 400);
        }
        const token = yield response.json();
        if (!token || typeof token.token !== "string") {
            throw new errors_1.ClientError("Formato de token inválido recibido de ISP Cube", 500);
        }
        return token;
    }
    catch (error) {
        console.error("Error en el servicio de IspCube:", error);
        throw new errors_1.ClientError("No se pudo conectar con IspCube.", 500);
    }
});
exports.fetchLoginIspCube = fetchLoginIspCube;
const loginIspCubeService = (loginIspCubeDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { apiKey, clientId, email, passwordIspCube, username } = loginIspCubeDto;
        const user = yield (0, user_service_1.findByEmail)(email);
        const token = yield (0, exports.fetchLoginIspCube)({
            apiKey,
            clientId,
            passwordIspCube,
            username,
        });
        if (!user.ispCubeUser) {
            const encryptedApiKey = (0, hashPropsHeader_1.encrypt)(apiKey);
            const encryptedClientId = (0, hashPropsHeader_1.encrypt)(clientId);
            const userIspCube = dataSource_1.ispCubeUserModel.create({
                apiKey: encryptedApiKey,
                clientId: encryptedClientId,
                username,
            });
            yield dataSource_1.ispCubeUserModel.save(userIspCube);
            user.ispCubeUser = userIspCube;
            yield dataSource_1.userModel.save(user);
        }
        return token;
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("Error al iniciar sesión", 500);
    }
});
exports.loginIspCubeService = loginIspCubeService;
const getUsersFromIspCubeService = (token, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.ispCubeUser) {
        throw new errors_1.ClientError("El usuario no tiene configuradas credenciales de ISP Cube", 400);
    }
    try {
        const response = yield (0, node_fetch_1.default)(`${envs_1.ISPCUBEURL}/api/customers/customers_list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "api-key": user.ispCubeUser.apiKey,
                "client-id": user.ispCubeUser.clientId,
                username: user.ispCubeUser.username,
                "login-type": "api",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new errors_1.ClientError(`Error al obtener datos de IspCube: ${response.statusText}`, 400);
        }
        const users = yield response.json();
        return users;
    }
    catch (error) {
        console.error("Error en el servicio de IspCube:", error);
        throw new errors_1.ClientError("No se pudo conectar con IspCube.", 500);
    }
});
exports.getUsersFromIspCubeService = getUsersFromIspCubeService;
const factFetchLink = (token, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, node_fetch_1.default)(`${envs_1.ISPCUBEURL}/api/bills/last_bill_api?customer_id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "api-key": user.ispCubeUser.apiKey,
                "client-id": user.ispCubeUser.clientId,
                username: user.ispCubeUser.username,
                "login-type": "api",
                Authorization: `Bearer ${token}`,
            },
        });
        // if (!response.ok) {
        // throw new ClientError(
        //   `Error al obtener datos de IspCube: ${response.statusText}`,
        //   400
        // );
        // }
        if (!response.ok) {
            const errorData = yield response.json();
            return (errorData === null || errorData === void 0 ? void 0 : errorData.message) || "Error desconocido";
        }
        const fact = yield response.text();
        return fact || "Factura no encontrada";
    }
    catch (error) {
        console.error("Error en el servicio de IspCube:", error);
        throw new errors_1.ClientError("No se pudo conectar con IspCube.", 500);
    }
});
exports.factFetchLink = factFetchLink;
