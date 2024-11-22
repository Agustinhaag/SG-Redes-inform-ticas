import { Router } from "express";
import usersRouter from "./users.router";
import adminRouter from "./admin.router";
import ispCubeRouter from "./ispCube.router";
import wablasRouter from "./wablas.router";

const router = Router();

router.use("/auth", usersRouter);

router.use("/admin",adminRouter)

router.use("/ispCube",ispCubeRouter)

router.use("/wablas", wablasRouter)

export default router;