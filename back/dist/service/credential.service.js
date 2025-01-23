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
exports.checkPasswordService = exports.createCredentialService = void 0;
const class_validator_1 = require("class-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Credentials_1 = require("../entities/Credentials");
const dataSource_1 = require("../config/dataSource");
const errors_1 = require("../utils/errors");
const createCredentialService = (credentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { password } = credentialDto;
        const tempCredential = new Credentials_1.Credential();
        tempCredential.password = password; // Validamos la contraseña sin hash
        yield (0, class_validator_1.validateOrReject)(tempCredential); // Validación con class-validator
        // Si pasa la validación, hashear la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Crear credencial y guardarla
        const credential = dataSource_1.credentialModel.create({
            password: hashedPassword,
        });
        yield dataSource_1.credentialModel.save(credential);
        return credential;
    }
    catch (error) {
        if (Array.isArray(error) && ((_a = error[0]) === null || _a === void 0 ? void 0 : _a.constraints)) {
            // Lanzar un error controlado de validación
            throw new errors_1.ClientError(`Error de validación: ${error
                .map((e) => Object.values(e.constraints).join(", "))
                .join("; ")}`, 400);
        }
        // Lanzar un error genérico para otros problemas
        throw new errors_1.ClientError("No se pudo crear la credencial.", 500);
    }
});
exports.createCredentialService = createCredentialService;
const checkPasswordService = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(password, hashedPassword);
});
exports.checkPasswordService = checkPasswordService;
