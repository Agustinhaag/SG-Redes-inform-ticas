import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookie from "cookie-session";
import router from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
// app.use(
//   cookie({
//     keys: ["your-secret-key"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// )

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

export default app;
