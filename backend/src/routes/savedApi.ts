import { Router, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { prisma } from '../lib/prisma.js'
import { auth } from '../middleware/auth.js'
import {
  connectToMongoDB,
  decryptPassword,
  MongoConnectionConfig,
} from '../services/mongodb.service.js'

const router = Router()
router.use(auth)

// ── Helper ──────────────────────────────────────────────────────────
function tryObjectId(val: any) {
  if (typeof val === 'string' && /^[a-fA-F0-9]{24}$/.test(val)) {
    try {
      return new ObjectId(val)
    } catch {
      return val
    }
  }
  return val
}

async function getMongoConfig(connectionId: string, userId: string): Promise<MongoConnectionConfig | null> {
  const conn = await prisma.connection.findFirst({
    where: { id: connectionId, userId },
  })
  if (!conn) return null

  return {
    host: conn.host,
    port: conn.port,
    username: conn.username,
    password: conn.encryptedPassword ? decryptPassword(conn.encryptedPassword) : null,
    authDb: conn.authDb,
    connectionString: conn.connectionString,
    ssl: conn.ssl,
  }
}

// ── CRUD ─────────────────────────────────────────────────────────────

/** POST /api/saved-apis — Create */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      apiName, columns = [], method = 'GET', dbName, collectionName,
      description, payloadSample, connectionId, meta,
    } = req.body

    if (!apiName) return res.status(400).json({ success: false, msg: 'apiName is required' })
    if (!connectionId) return res.status(400).json({ success: false, msg: 'connectionId is required' })

    const savedApi = await prisma.savedApi.create({
      data: {
        apiName,
        columns,
        method: String(method).toUpperCase(),
        dbName: dbName || null,
        collectionName: collectionName || null,
        description: description || null,
        payloadSample: payloadSample || null,
        meta: meta || null,
        connectionId,
        userId: req.user.id,
      },
    })

    res.status(201).json({ success: true, data: savedApi })
  } catch (error) {
    console.error('Create saved API failed:', error)
    res.status(500).json({ success: false, msg: 'Failed to create saved API' })
  }
})

/** GET /api/saved-apis — List */
router.get('/', async (req: Request, res: Response) => {
  const apis = await prisma.savedApi.findMany({
    where: { userId: req.user.id },
    include: { connection: { select: { id: true, name: true, type: true } } },
    orderBy: { createdAt: 'desc' },
  })
  res.json({ success: true, data: apis })
})

/** GET /api/saved-apis/:id — Get one */
router.get('/:id', async (req: Request, res: Response) => {
  const api = await prisma.savedApi.findFirst({
    where: { id: req.params.id, userId: req.user.id },
    include: { connection: { select: { id: true, name: true, type: true } } },
  })
  if (!api) return res.status(404).json({ success: false, msg: 'Saved API not found' })
  res.json({ success: true, data: api })
})

/** PUT /api/saved-apis/:id — Update */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.savedApi.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    })
    if (!existing) return res.status(404).json({ success: false, msg: 'Not found' })

    const { apiName, columns, method, dbName, collectionName, description, payloadSample, connectionId, meta } = req.body

    const updated = await prisma.savedApi.update({
      where: { id: req.params.id },
      data: {
        ...(apiName !== undefined && { apiName }),
        ...(columns !== undefined && { columns }),
        ...(method !== undefined && { method: String(method).toUpperCase() }),
        ...(dbName !== undefined && { dbName }),
        ...(collectionName !== undefined && { collectionName }),
        ...(description !== undefined && { description }),
        ...(payloadSample !== undefined && { payloadSample }),
        ...(connectionId !== undefined && { connectionId }),
        ...(meta !== undefined && { meta }),
      },
    })

    res.json({ success: true, data: updated })
  } catch (error) {
    console.error('Update saved API failed:', error)
    res.status(500).json({ success: false, msg: 'Update failed' })
  }
})

/** DELETE /api/saved-apis/:id */
router.delete('/:id', async (req: Request, res: Response) => {
  const existing = await prisma.savedApi.findFirst({
    where: { id: req.params.id, userId: req.user.id },
  })
  if (!existing) return res.status(404).json({ success: false, msg: 'Not found' })

  await prisma.savedApi.delete({ where: { id: req.params.id } })
  res.json({ success: true })
})

// ── Execute Engine ──────────────────────────────────────────────────

/** POST /api/saved-apis/:id/execute — Universal Executor */
router.post('/:id/execute', async (req: Request, res: Response) => {
  try {
    const api = await prisma.savedApi.findFirst({
      where: { id: req.params.id, userId: req.user.id },
    })
    if (!api) return res.status(404).json({ success: false, msg: 'Saved API not found' })

    const dbName = api.dbName || req.body.dbName
    const collectionName = api.collectionName || req.body.collectionName

    if (!dbName || !collectionName) {
      return res.status(400).json({ success: false, msg: 'Missing dbName or collectionName' })
    }

    const config = await getMongoConfig(api.connectionId, req.user.id)
    if (!config) return res.status(404).json({ success: false, msg: 'Connection not found' })

    const client = await connectToMongoDB(config)
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const method = (api.method || 'GET').toUpperCase()
    const payload = req.body?.payload ?? {}
    const now = new Date()
    const meta = (api.meta || {}) as any

    // ── GET ──
    if (method === 'GET' || method === 'FETCH') {
      const joins = meta.joins
      const filter = payload.filter || {}
      const sort = payload.sort || { _id: -1 }
      const limit = payload.limit || 100
      const skip = payload.skip || 0

      if (Array.isArray(joins) && joins.length > 0) {
        // Aggregation pipeline with joins
        const pipeline: any[] = []

        if (Object.keys(filter).length > 0) {
          pipeline.push({ $match: filter })
        }

        for (const join of joins) {
          if (!join.from || !join.localField || !join.foreignField || !join.as) {
            return res.status(400).json({ success: false, msg: 'Invalid join config' })
          }
          pipeline.push({
            $lookup: {
              from: join.from,
              localField: join.localField,
              foreignField: join.foreignField,
              as: join.as,
            },
          })
          if (join.unwind) {
            pipeline.push({ $unwind: { path: `$${join.as}`, preserveNullAndEmptyArrays: true } })
          }
        }

        if (api.columns && api.columns.length > 0) {
          const projection: any = {}
          api.columns.forEach((col) => { projection[col] = 1 })
          pipeline.push({ $project: projection })
        }

        pipeline.push({ $sort: sort }, { $skip: skip }, { $limit: limit })

        const docs = await collection.aggregate(pipeline).toArray()
        return res.json({ success: true, method, count: docs.length, data: docs })
      } else {
        // Simple find
        let projection: any = {}
        if (api.columns && api.columns.length > 0) {
          api.columns.forEach((col) => { projection[col] = 1 })
        }

        const docs = await collection
          .find(filter, { projection: Object.keys(projection).length > 0 ? projection : undefined })
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .toArray()

        return res.json({ success: true, method, count: docs.length, data: docs })
      }
    }

    // ── POST ──
    if (method === 'POST') {
      const incoming = Array.isArray(payload) ? payload : [payload]
      const docs = incoming.map((item: any = {}) => {
        const doc: any = { ...item }
        try {
          doc._id = doc._id ? new ObjectId(doc._id) : new ObjectId()
        } catch {
          doc._id = new ObjectId()
        }
        if (!doc.id) doc.id = doc._id.toString()
        doc.createdAt = doc.createdAt || now
        doc.updatedAt = now
        return doc
      })

      const insertRes = await collection.insertMany(docs)
      const insertedIds = Object.values(insertRes.insertedIds)
      const inserted = await collection.find({ _id: { $in: insertedIds } }).toArray()

      return res.status(201).json({
        success: true, method,
        insertedCount: insertRes.insertedCount,
        data: inserted,
      })
    }

    // ── PUT ──
    if (method === 'PUT') {
      const incoming = Array.isArray(payload) ? payload : [payload]
      if (incoming.length === 0) {
        return res.status(400).json({ success: false, msg: 'Empty payload' })
      }

      const matchField = meta.matchField ? String(meta.matchField) : '_id'
      const EXCLUDE = new Set(['_id', 'id', '__v', 'createdAt', 'updatedAt'])
      const allowedCols = (api.columns || []).filter((c) => !EXCLUDE.has(c) && c !== matchField)

      if (allowedCols.length === 0) {
        return res.status(400).json({ success: false, msg: 'No editable columns' })
      }

      const ops: any[] = []
      for (const item of incoming) {
        let matchVal = item[matchField] ?? item._id ?? item.id
        if (matchVal == null || matchVal === '') {
          return res.status(400).json({ success: false, msg: `Match field "${matchField}" is required` })
        }

        const filter = matchField === '_id'
          ? { _id: new ObjectId(matchVal) }
          : { [matchField]: tryObjectId(matchVal) }

        const setFields: any = {}
        for (const col of allowedCols) {
          if (Object.prototype.hasOwnProperty.call(item, col)) {
            setFields[col] = item[col]
          }
        }
        setFields.updatedAt = now

        ops.push({ filter, update: { $set: setFields } })
      }

      for (const op of ops) {
        await collection.updateOne(op.filter, op.update)
      }

      const filters = ops.map((o) => o.filter)
      const query = filters.length === 1 ? filters[0] : { $or: filters }
      const updatedDocs = await collection.find(query).toArray()

      return res.json({ success: true, method, data: updatedDocs })
    }

    // ── DELETE ──
    if (method === 'DELETE') {
      const incoming = Array.isArray(payload) ? payload : [payload]
      if (incoming.length === 0) {
        return res.status(400).json({ success: false, msg: 'Empty payload' })
      }

      const matchField = meta.matchField ? String(meta.matchField) : '_id'
      const deletedDocs: any[] = []
      let totalDeleted = 0

      for (const item of incoming) {
        let matchVal = item[matchField] ?? item._id ?? item.id
        if (matchVal == null || matchVal === '') continue

        const filter = matchField === '_id'
          ? { _id: new ObjectId(matchVal) }
          : { [matchField]: tryObjectId(matchVal) }

        const docsToDelete = await collection.find(filter).toArray()
        if (docsToDelete.length === 0) continue

        const delRes = await collection.deleteMany(filter)
        totalDeleted += delRes.deletedCount || 0
        deletedDocs.push(...docsToDelete)
      }

      return res.json({ success: true, method, deletedCount: totalDeleted, data: deletedDocs })
    }

    return res.status(400).json({ success: false, msg: `Method ${method} not supported` })
  } catch (error) {
    console.error('Execute saved API failed:', error)
    res.status(500).json({ success: false, msg: 'Execution failed' })
  }
})

export { router as savedApiRoutes }
