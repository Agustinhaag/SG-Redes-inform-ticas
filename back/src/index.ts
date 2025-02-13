import app from "./server";
import "reflect-metadata";
import "dotenv/config";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/dataSource";

import https from "https";
import fs from "fs";

// Función para iniciar el servidor en modo desarrollo (local)
const startDevelopmentServer = () => {
  app.listen(PORT || 4000, () => {
    console.log(`Server running on http://localhost:${PORT || 4000}`);
  });
};

// Función para iniciar el servidor en modo producción (con HTTPS)
const startProductionServer = () => {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/chain.pem",
    "utf8"
  );

  const credentials = { key: privateKey, cert: certificate, ca: ca };

  https.createServer(credentials, app).listen(PORT || 4000, () => {
    console.log(
      `Server running on https://sistema.sgredesinformaticas.com.ar:${PORT || 4000}`
    );
  });
};

const initialize = async () => {
  await AppDataSource.initialize();
  console.log("Database initialized");

  if (process.env.NODE_ENV === "production") {
    startProductionServer();
  } else {
    startDevelopmentServer();
  }
};

initialize();
