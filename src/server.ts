import dotenv from "dotenv";
import app from "./app";
import configFile from "./config/env";
import createTables from "./config/db";
dotenv.config();

const runServer = async () => {
  try {
    await createTables();

    app.listen(configFile.port, () => {
      console.log(`Server is running http://localhost:${configFile.port}`);
    });
  } catch (error) {
    console.log("Database connection failed", error);
  }
};

runServer();
