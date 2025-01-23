import next from 'next';
import express, { Request, Response } from 'express';  // Importa Request y Response de express
import https from 'https';
import fs from 'fs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const privateKey = fs.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sistema.sgredesinformaticas.com.ar/chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

app.prepare().then(() => {
  const server = express();

  // Maneja todas las rutas, utilizando los tipos correctos
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Crea el servidor HTTPS
  https.createServer(credentials, server).listen(4000, () => {
    console.log('> Server running on https://localhost:4000');
  });
});

