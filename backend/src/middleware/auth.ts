import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'

export interface AuthRequest extends Request {
  userId?: string
}

interface JwtPayload {
  userId: string
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Access token required' })
    return
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback-secret'
    const decoded = jwt.verify(token, secret) as JwtPayload

    // Verify user actually exists in the database
    prisma.user
      .findUnique({ where: { id: decoded.userId } })
      .then(user => {
        if (!user) {
          res.status(401).json({ error: 'User not found. Please log in again.' })
          return
        }
        req.userId = decoded.userId
        next()
      })
      .catch(() => {
        res.status(500).json({ error: 'Database error during authentication' })
      })
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}
