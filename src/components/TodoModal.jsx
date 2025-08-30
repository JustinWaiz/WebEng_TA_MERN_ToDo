import React, { useEffect, useState } from 'react'

export default function TodoModal({ show, onClose, onSave, todo }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('work')
  const [dueDate, setDueDate] = useState('')
  const [completed, setCompleted] = useState(false)
  const [icon, setIcon] = useState(null)
  const [iconPreview, setIconPreview] = useState(null)

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '')
      setDescription(todo.description || '')
      setCategory(todo.category || 'work')
      setDueDate(todo.dueDate || '')
      setCompleted(todo.completed || false)
      setIcon(todo.icon || null)
      setIconPreview(todo.icon || null)
    } else {
      setTitle('')
      setDescription('')
      setCategory('work')
      setDueDate('')
      setCompleted(false)
      setIcon(null)
      setIconPreview(null)
    }
  }, [todo, show])

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setIcon(reader.result)
        setIconPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      id: todo?.id || Date.now(),
      title,
      description,
      category,
      dueDate,
      completed,
      icon,
    })
  }

  if (!show) return null

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{todo ? 'Edit task' : 'New task'}</h1>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="work">Work</option>
                    <option value="private">Private</option>
                    <option value="school">School</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Icon</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFile}
                  />
                  {iconPreview && (
                    <img
                      src={iconPreview}
                      alt="preview"
                      className="img-thumbnail mt-2"
                      style={{ maxWidth: '100px' }}
                    />
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                  <label className="form-check-label">Done</label>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}
