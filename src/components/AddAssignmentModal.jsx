import { useState } from 'react'

export default function AddAssignmentModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ title: '', due: '' })
  const [error, setError] = useState('')

  const handleSubmit = () => {
    setError('')
    if (!form.title || !form.title.trim()) {
      setError('Please enter an assignment title')
      return
    }

    try {
      const ok = typeof onAdd === 'function' ? onAdd(form) : false
      if (ok) {
        if (typeof onClose === 'function') onClose()
      } else {
        setError('Could not add assignment. Please check your input.')
      }
    } catch (e) {
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Add Assignment
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            className="input"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Assignment title"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />

          <div>
            <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>
              Due date (optional)
            </label>
            <input
              className="input"
              type="date"
              value={form.due}
              onChange={e => setForm({ ...form, due: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
              Add Task
            </button>
          </div>
          {error && (
            <p style={{ color: '#ffb4b4', marginTop: 8, fontSize: 13 }}>{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
