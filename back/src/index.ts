import app from "./server";
import "reflect-metadata";
import "dotenv/config";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/dataSource";
import https from "https";  // Importamos https
import fs from "fs";

const privateKey = fs.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

const initialize = async () => {
  await AppDataSource.initialize();
  console.log("Database initialized");
  
  https.createServer(credentials, app).listen(PORT || 4000, () => {
    console.log(`Server running on https://localhost:${PORT || 4000}`);
  });
};

initialize();
