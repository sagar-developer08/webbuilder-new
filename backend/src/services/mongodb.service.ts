import { MongoClient } from 'mongodb'
import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-encryption-key-change-me!!'

// Connection pool cache
const clientCache = new Map<string, MongoClient>()

export interface MongoConnectionConfig {
  host: string
  port: number
  username?: string | null
  password?: string | null
  authDb?: string | null
  ssl?: boolean
  connectionString?: string | null
}

/**
 * Encrypt a password for storage
 */
export function encryptPassword(password: string): string {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString()
}

/**
 * Decrypt a stored password
 */
export function decryptPassword(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

/**
 * Build a MongoDB connection URI from config
 */
function buildConnectionUri(config: MongoConnectionConfig): string {
  if (config.connectionString) {
    return config.connectionString
  }

  const { host, port, username, password, authDb, ssl } = config
  let uri = 'mongodb://'

  if (username && password) {
    uri += `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`
  }

  uri += `${host}:${port}`

  if (authDb) {
    uri += `/${authDb}`
  }

  if (ssl) {
    uri += uri.includes('?') ? '&tls=true' : '?tls=true'
  }

  return uri
}

/**
 * Connect to a MongoDB instance using the provided config.
 * Caches connections by a hash of the connection details.
 */
export async function connectToMongoDB(config: MongoConnectionConfig): Promise<MongoClient> {
  const uri = buildConnectionUri(config)
  const cacheKey = CryptoJS.MD5(uri).toString()

  if (clientCache.has(cacheKey)) {
    const cached = clientCache.get(cacheKey)!
    try {
      // Ping to verify connection is still alive
      await cached.db('admin').command({ ping: 1 })
      return cached
    } catch {
      // Connection is dead, remove from cache
      clientCache.delete(cacheKey)
    }
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })

  await client.connect()
  clientCache.set(cacheKey, client)
  return client
}

/**
 * Test a MongoDB connection (connect and immediately ping)
 */
export async function testMongoConnection(config: MongoConnectionConfig): Promise<boolean> {
  const uri = buildConnectionUri(config)
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })

  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    return true
  } finally {
    await client.close()
  }
}
