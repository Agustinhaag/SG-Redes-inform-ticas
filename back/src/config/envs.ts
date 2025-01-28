import dotenv from "dotenv";
dotenv.config();

export const PORT: number = Number(process.env.PORT) || 4000;
export const DB_NAME: string = process.env.DB_NAME || "SG-Proyect";
export const DB_USER: string = process.env.DB_USER || "postgres";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "admin";
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;
export const JWT_SECRET: string = process.env.JWT_SECRET || "secret";
export const KEYGMAIL: string = process.env.KEYGMAIL || " ";
export const ISPCUBEURL: string = process.env.ISPCUBEURL || " ";
export const secretKey: string = process.env.SECRETKEY_ISPCUBE || "mySecretKey";
export const URL_FRONT: string = process.env.URL_FRONT || " ";
export const URL_WABLAS: string = process.env.URL_WABLAS || " ";
export const APIKEY_WABLAS: string = process.env.APIKEY_WABLAS || "";
export const SMTP_HOST: string = process.env.SMTP_HOST || "";
export const SMTP_USER: string = process.env.SMTP_USER || "";
export const SMTP_PASS: string = process.env.SMTP_PASS || "";
