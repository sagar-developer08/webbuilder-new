import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'
import { auth } from '../middleware/auth.js'
import {
  encryptPassword,
  decryptPassword,
  testMongoConnection,
} from '../services/mongodb.service.js'

const router = Router()
router.use(auth)

/**
 * GET /api/connections — List all connections for current user
 */
router.get('/', async (req: Request, res: Response) => {
  const connections = await prisma.connection.findMany({
    where: { userId: req.user.id },
    select: {
      id: true,
      name: true,
      type: true,
      host: true,
      port: true,
      username: true,
      authDb: true,
      ssl: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })
  res.json({ success: true, data: connections })
})

/**
 * POST /api/connections — Create a new connection
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, type, host, port, username, password, authDb, connectionString, ssl } = req.body

    if (!name) {
      return res.status(400).json({ success: false, msg: 'Connection name is required' })
    }

    if (!connectionString && !host) {
      return res.status(400).json({ success: false, msg: 'Either host or connectionString is required' })
    }

    const encryptedPassword = password ? encryptPassword(password) : null

    const connection = await prisma.connection.create({
      data: {
        name,
        type: type || 'mongodb',
        host: host || '',
        port: port || 27017,
        username: username || null,
        encryptedPassword,
        authDb: authDb || 'admin',
        connectionString: connectionString || null,
        ssl: ssl || false,
        userId: req.user.id,
      },
    })

    res.status(201).json({ success: true, data: { ...connection, encryptedPassword: undefined } })
  } catch (error) {
    console.error('Create connection failed:', error)
    res.status(500).json({ success: false, msg: 'Failed to create connection' })
  }
})

/**
 * POST /api/connections/:id/test — Test a connection
 */
router.post('/:id/test', async (req: Request, res: Response) => {
  try {
    const connection = await prisma.connection.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    })

    if (!connection) {
      return res.status(404).json({ success: false, msg: 'Connection not found' })
    }

    const password = connection.encryptedPassword
      ? decryptPassword(connection.encryptedPassword)
      : null

    const isConnected = await testMongoConnection({
      host: connection.host,
      port: connection.port,
      username: connection.username,
      password,
      authDb: connection.authDb,
      connectionString: connection.connectionString,
      ssl: connection.ssl,
    })

    res.json({ success: true, connected: isConnected })
  } catch (error: any) {
    res.json({ success: false, connected: false, msg: error.message })
  }
})

/**
 * DELETE /api/connections/:id
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const connection = await prisma.connection.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  })

  if (!connection) {
    return res.status(404).json({ success: false, msg: 'Connection not found' })
  }

  await prisma.connection.delete({ where: { id: req.params.id } })
  res.json({ success: true })
})

export { router as connectionRoutes }
