import jwt from "jsonwebtoken";
import configFile from "../config/env";

export const generateToken = (payload: any) => {
  return jwt.sign(payload, configFile.jwtSecret, {
    expiresIn: "7d",
  });
};
