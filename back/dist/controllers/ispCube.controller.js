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
exports.fetchFactController = exports.getUsersFromIspCubeController = exports.loginIspCube = void 0;
const ispCube_service_1 = require("../service/ispCube.service");
const catchedControllers_1 = require("../utils/catchedControllers");
const user_service_1 = require("../service/user.service");
exports.loginIspCube = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, passwordIspCube, clientId, apiKey, email } = req.body;
    const token = yield (0, ispCube_service_1.loginIspCubeService)({
        username,
        passwordIspCube,
        clientId,
        apiKey,
        email,
    });
    res.status(201).send({ token, login: true });
}));
exports.getUsersFromIspCubeController = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, email } = req.body;
        const user = yield (0, user_service_1.findByEmail)(email);
        const usersIspCube = yield (0, ispCube_service_1.getUsersFromIspCubeService)(token, user);
        res.status(200).json(usersIspCube);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.fetchFactController = (0, catchedControllers_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokenIspCube, id, email } = req.body;
        const user = yield (0, user_service_1.findByEmail)(email);
        const factLink = yield (0, ispCube_service_1.factFetchLink)(tokenIspCube, user, id);
        res.status(200).json(factLink);
    }
    catch (error) {
        console.log(error);
    }
}));
