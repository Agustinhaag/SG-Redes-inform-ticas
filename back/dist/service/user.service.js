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
exports.saveDevice = exports.findUserById = exports.findByEmail = exports.resetPasswordService = exports.initiatePasswordResetService = exports.loginUserService = exports.registerUserService = exports.checkUserExists = void 0;
const dataSource_1 = require("../config/dataSource");
const errors_1 = require("../utils/errors");
const credential_service_1 = require("./credential.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("../config/envs");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dayjs_1 = __importDefault(require("dayjs"));
const sendEmailResetPassword_1 = require("../helpers/sendEmailResetPassword");
const hashPropsHeader_1 = require("../helpers/hashPropsHeader");
const types_1 = require("../utils/types");
const checkUserExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield dataSource_1.userModel.findOneBy({ email });
    return !!user;
});
exports.checkUserExists = checkUserExists;
const registerUserService = (registerUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = dataSource_1.userModel.create(Object.assign(Object.assign({}, registerUserDto), { role: registerUserDto.role || types_1.Role.USER }));
        const credential = yield (0, credential_service_1.createCredentialService)({
            password: registerUserDto.password,
        });
        if (user.role === types_1.Role.ADMIN) {
            user.status = types_1.Status.ACTIVE;
        }
        user.credential = credential;
        yield dataSource_1.userModel.save(user);
        return "Registro exitoso";
    }
    catch (error) {
        console.error("Error al registrar usuario");
        // Si es un error de validación (específicamente de la contraseña)
        if (error instanceof errors_1.ClientError) {
            return Promise.reject(new errors_1.ClientError(error.message, 400));
        }
        // Si no es un error de validación, es un error interno
        throw new errors_1.ClientError("No se pudo crear el usuario", 500);
    }
});
exports.registerUserService = registerUserService;
const loginUserService = (loginUserDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({
            where: {
                email: loginUserDto.email,
            },
            relations: ["credential"],
        });
        if (!user) {
            throw new errors_1.ClientError("El usuario no está registrado", 404);
        }
        // Verifica la contraseña
        const isPasswordValid = yield (0, credential_service_1.checkPasswordService)(loginUserDto.password, user.credential.password);
        if (!isPasswordValid) {
            throw new errors_1.ClientError("Credenciales incorrectas", 400);
        }
        // Genera el token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, envs_1.JWT_SECRET);
        return token;
    }
    catch (error) {
        console.error("Error en loginUserService:", error);
        throw error; // Lanza el error para que se maneje en un nivel superior
    }
});
exports.loginUserService = loginUserService;
const initiatePasswordResetService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({ where: { email } });
        if (!user)
            throw new errors_1.ClientError("Usuario no encontrado.");
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, envs_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        const expirationDate = (0, dayjs_1.default)().add(1, "hour").toISOString();
        const passwordResetToken = dataSource_1.resetPassword.create({
            userId: user.id,
            token,
            expiresAt: expirationDate,
        });
        yield dataSource_1.resetPassword.save(passwordResetToken);
        yield (0, sendEmailResetPassword_1.sendPasswordResetEmail)(user.email, token);
        return "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.";
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("Error al enviar el correo", 500);
    }
});
exports.initiatePasswordResetService = initiatePasswordResetService;
const resetPasswordService = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetToken = yield dataSource_1.resetPassword.findOne({ where: { token } });
        if (!resetToken)
            throw new errors_1.ClientError("Token inválido o expirado.");
        if (new Date() > resetToken.expiresAt)
            throw new errors_1.ClientError("El token ha expirado.");
        const user = yield dataSource_1.userModel.findOne({
            where: { id: resetToken.userId },
            relations: ["credential"],
        });
        if (!user)
            throw new errors_1.ClientError("Usuario no encontrado.");
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        const credential = yield dataSource_1.credentialModel.findOne({
            where: { id: user.credential.id },
        });
        if (!credential)
            throw new errors_1.ClientError("Credenciales no encontradas.");
        credential.password = hashedPassword;
        yield dataSource_1.credentialModel.save(credential);
        yield dataSource_1.resetPassword.delete(resetToken.id);
        return "Contraseña restablecida correctamente.";
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("No se logro reestablecer la contraseña");
    }
});
exports.resetPasswordService = resetPasswordService;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({
            where: { email },
            relations: ["ispCubeUser"],
        });
        if (!user) {
            throw new errors_1.ClientError("El usuario no existe");
        }
        if (user.ispCubeUser) {
            const { apiKey, clientId } = user.ispCubeUser;
            if (apiKey) {
                user.ispCubeUser.apiKey = (0, hashPropsHeader_1.decrypt)(apiKey);
            }
            if (clientId) {
                user.ispCubeUser.clientId = (0, hashPropsHeader_1.decrypt)(clientId);
            }
        }
        return user;
    }
    catch (error) {
        console.log(error);
        throw new errors_1.ClientError("Error al obtener el usuario", 500);
    }
});
exports.findByEmail = findByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield dataSource_1.userModel.findOne({
            where: { id },
            relations: ["ispCubeUser"],
        });
        if (!user) {
            throw new errors_1.ClientError("El usuario no existe");
        }
        return user;
    }
    catch (error) {
        throw new errors_1.ClientError("Error al obtener el usuario", 500);
    }
});
exports.findUserById = findUserById;
const saveDevice = (id, device) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserById)(id);
        if (!user) {
            throw new errors_1.ClientError("El usuario no existe");
        }
        user.device = device;
        yield dataSource_1.userModel.save(user);
        return user;
    }
    catch (error) {
        throw new errors_1.ClientError("Error al guardar el dispositivo", 500);
    }
});
exports.saveDevice = saveDevice;
