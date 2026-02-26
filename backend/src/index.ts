import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth'
import sitesRoutes from './routes/sites'
import publicRoutes from './routes/public'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// --------------- Middleware ---------------

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// --------------- Routes ---------------

app.use('/api/auth', authRoutes)
app.use('/api/sites', sitesRoutes)
app.use('/api/public', publicRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// --------------- Error handling ---------------

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// --------------- Start server ---------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})

export default app
