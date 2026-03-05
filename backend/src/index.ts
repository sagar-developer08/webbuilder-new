import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { siteRoutes } from './routes/sites.js'
import { publicRoutes } from './routes/public.js'
import { logRoutes } from './routes/logs.js'
import { supersetRoutes } from './routes/superset.js'
import { authRoutes } from './routes/auth.js'
import { savedApiRoutes } from './routes/savedApi.js'
import { connectionRoutes } from './routes/connections.js'
import { errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'

const app = express()
const PORT = process.env.PORT || 3001

// Allow multiple origins for development flexibility
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(requestLogger)

app.use('/api/logs', logRoutes)
app.use('/api/superset', supersetRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', publicRoutes)
app.use('/api/sites', siteRoutes)
app.use('/api/saved-apis', savedApiRoutes)
app.use('/api/connections', connectionRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Framely backend running on http://localhost:${PORT}`)
})
