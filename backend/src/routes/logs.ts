import { Router } from "express";
import { z } from "zod";
import { log } from "../lib/logger.js";

const router = Router();

const logBodySchema = z.object({
  level: z.enum(["info", "warn", "error", "debug"]),
  action: z.string().min(1).max(100),
  message: z.string(),
  meta: z.record(z.unknown()).optional(),
  source: z.enum(["frontend", "backend"]).optional(),
});

router.post("/", async (req, res) => {
  try {
    const body = logBodySchema.parse(req.body);
    log({
      level: body.level as "info" | "warn" | "error" | "debug",
      action: body.action,
      message: body.message,
      meta: body.meta,
      source: body.source ?? "frontend",
    });
    res.json({ success: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ success: false, msg: e.errors[0]?.message });
    }
    throw e;
  }
});

export { router as logRoutes };
