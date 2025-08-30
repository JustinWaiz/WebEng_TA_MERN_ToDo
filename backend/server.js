import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 4000

mongoose
  .connect(process.env.MONGODB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`))
  })
  .catch((err) => {
    console.error('Mongo connection error', err)
    process.exit(1)
  })
