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
exports.sendPasswordResetEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../config/envs");
const sendPasswordResetEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: envs_1.USERGMAIL,
                pass: envs_1.KEYGMAIL,
            },
        });
        const resetLink = `${envs_1.URL_FRONT}/reset-password?token=${token}`;
        const mailOptions = {
            from: envs_1.USERGMAIL,
            to: email,
            subject: "Restablecimiento de contraseña",
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`,
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error("Error en sendPasswordResetEmail:", error);
        throw new Error("No se pudo enviar el correo.");
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
