import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import configFile from "../config/env";
import { UserRole } from "../modules/users/user.interface";

const auth = (...requiredRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from header
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized!");
      }

      // Verify token
      const decoded = jwt.verify(token, configFile.jwtSecret) as any;

      // Check role authorization
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new Error("You are not authorized!");
      }

      // Attach user to request
      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Unauthorized",
      });
    }
  };
};

export default auth;
