import { NextFunction, Request, Response } from "express";

const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        error: error.issues.map((issue: any) => ({
          path: issue.path[1],
          message: issue.message,
        })),
      });
    }
  };

export default validate;
