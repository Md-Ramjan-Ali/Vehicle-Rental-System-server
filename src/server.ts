import dotenv from "dotenv";
import db from "./config/db";
import app from "./app";
import configFile from "./config/env";
dotenv.config();


const runServer = async () => {
    try {
        await db.connect().then(() => {
            console.log("Database connected");
        })
        app.listen(configFile.port, () => {
            console.log(`Server is running http://localhost:${configFile.port}`);
        })
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

runServer()
