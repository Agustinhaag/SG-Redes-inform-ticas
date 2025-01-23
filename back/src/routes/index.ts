import { Router } from "express";
import usersRouter from "./users.router";
import adminRouter from "./admin.router";
import ispCubeRouter from "./ispCube.router";
import wablasRouter from "./wablas.router";
import campaignRouter from "./campaign.router";

const router = Router();

router.use("/api/auth", usersRouter);

router.use("/api/admin",adminRouter)

router.use("/api/ispCube",ispCubeRouter)

router.use("/api/wablas", wablasRouter)

router.use("/api/campaign", campaignRouter)

export default router;
