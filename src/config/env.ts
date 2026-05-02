import dotenv from "dotenv";
dotenv.config();

const configFile = {
  connection_string: process.env.DATABASE_URL as string,
  port: process.env.PORT as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default configFile;
