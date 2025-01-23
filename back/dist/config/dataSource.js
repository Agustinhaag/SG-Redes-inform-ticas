"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ispCubeUserModel = exports.resetPassword = exports.credentialModel = exports.userModel = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Credentials_1 = require("../entities/Credentials");
const PasswordResetToken_1 = require("../entities/PasswordResetToken");
const IspCubeUser_1 = require("../entities/IspCubeUser");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USER,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_NAME,
    synchronize: true,
    // dropSchema: true,
    logging: false,
    entities: [User_1.User, Credentials_1.Credential, PasswordResetToken_1.PasswordResetToken, IspCubeUser_1.IspCubeUser],
    subscribers: [],
    migrations: [],
});
exports.userModel = exports.AppDataSource.getRepository(User_1.User);
exports.credentialModel = exports.AppDataSource.getRepository(Credentials_1.Credential);
exports.resetPassword = exports.AppDataSource.getRepository(PasswordResetToken_1.PasswordResetToken);
exports.ispCubeUserModel = exports.AppDataSource.getRepository(IspCubeUser_1.IspCubeUser);
