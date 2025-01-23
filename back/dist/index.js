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
const server_1 = __importDefault(require("./server"));
require("reflect-metadata");
require("dotenv/config");
const envs_1 = require("./config/envs");
const dataSource_1 = require("./config/dataSource");
const https_1 = __importDefault(require("https")); // Importamos https
const fs_1 = __importDefault(require("fs"));
const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/privkey.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/cert.pem', 'utf8');
const ca = fs_1.default.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/chain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dataSource_1.AppDataSource.initialize();
    console.log("Database initialized");
    https_1.default.createServer(credentials, server_1.default).listen(envs_1.PORT || 4000, () => {
        console.log(`Server running on https://localhost:${envs_1.PORT || 4000}`);
    });
});
initialize();
