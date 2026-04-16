import { Request, Response, NextFunction } from "express";
import { logRequest } from "../lib/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logRequest({
      message: `${req.method} ${req.path} ${res.statusCode}`,
      meta: {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: duration,
        userAgent: req.get("user-agent") ?? undefined,
      },
      action: "request",
    });
  });

  next();
}
