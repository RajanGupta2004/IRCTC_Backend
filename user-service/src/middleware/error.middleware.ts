import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
  });
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};
