import { Request, Response, NextFunction } from "express";
import { logError } from "../lib/logger.js";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  logError("error_handler", err.message || "Internal server error", { path: req.path, method: req.method });
  console.error(err);
  res.status(500).json({
    success: false,
    msg: err.message || "Internal server error",
  });
}
