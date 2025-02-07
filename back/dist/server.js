"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: 'https://sistema.sgredesinformaticas.com.ar',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
// app.use(
//   cookie({
//     keys: ["your-secret-key"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// )
app.use(routes_1.default);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: err.message });
});
exports.default = app;
