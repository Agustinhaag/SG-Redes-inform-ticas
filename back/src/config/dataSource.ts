import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./envs";
import { User } from "../entities/User";
import { Credential } from "../entities/Credentials";
import { PasswordResetToken } from "../entities/PasswordResetToken";
import { IspCubeUser } from "../entities/IspCubeUser";
import { Campaign } from "../entities/Campaign";
import { Message } from "../entities/Messages";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  // dropSchema: true,
  logging: false,
  entities: [User, Credential, PasswordResetToken, IspCubeUser, Campaign,Message],
  subscribers: [],
  migrations: [],
});

export const userModel = AppDataSource.getRepository(User);
export const credentialModel = AppDataSource.getRepository(Credential);
export const resetPassword = AppDataSource.getRepository(PasswordResetToken);
export const ispCubeUserModel = AppDataSource.getRepository(IspCubeUser);
export const campaignModel = AppDataSource.getRepository(Campaign);
export const messageModel = AppDataSource.getRepository(Message);
