import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import todoRoutes from './routes/todos.js'
import { authMiddleware } from './middleware/auth.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/todos', authMiddleware, todoRoutes)

export default app
