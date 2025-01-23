"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const errors_1 = require("../utils/errors");
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        next(new errors_1.ClientError("Debe enviar todos los campos requeridos", 400));
    else
        next();
};
exports.validateLogin = validateLogin;
