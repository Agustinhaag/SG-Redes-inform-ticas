"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const envs_1 = require("../config/envs");
const encrypt = (text) => {
    const encrypted = crypto_js_1.default.AES.encrypt(text, envs_1.secretKey).toString();
    return encrypted;
};
exports.encrypt = encrypt;
const decrypt = (encryptedText) => {
    const bytes = crypto_js_1.default.AES.decrypt(encryptedText, envs_1.secretKey);
    const decrypted = bytes.toString(crypto_js_1.default.enc.Utf8);
    return decrypted;
};
exports.decrypt = decrypt;
