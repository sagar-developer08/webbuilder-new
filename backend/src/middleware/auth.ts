import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface JwtPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const sessionId = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!sessionId) {
    return res.status(401).json({ success: false, msg: "Authentication required" });
  }

  try {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (!session || session.expiresAt < new Date()) {
      return res.status(403).json({ success: false, msg: "Invalid or expired session" });
    }

    const decoded = jwt.verify(session.token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ success: false, msg: "Invalid or expired token" });
  }
}

/** Same as authenticateToken but does not fail when no token; req.user is set only when token is valid. */
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const sessionId = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!sessionId) {
    return next();
  }

  try {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    if (session && session.expiresAt >= new Date()) {
      const decoded = jwt.verify(session.token, JWT_SECRET) as JwtPayload;
      req.user = decoded;
    }
  } catch {
    // ignore invalid token
  }
  next();
}
