import app from "./server";
import "reflect-metadata";
import "dotenv/config";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/dataSource";

const initialize = async () => {
  await AppDataSource.initialize();
  console.log("Database initialized");
  app.listen(PORT || 4000, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

initialize();
