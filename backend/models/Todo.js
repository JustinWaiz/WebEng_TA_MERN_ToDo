import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  dueDate: String,
  completed: { type: Boolean, default: false },
  icon: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Todo', todoSchema)

