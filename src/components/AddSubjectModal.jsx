import { useState } from 'react'

export default function AddSubjectModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ name: '', emoji: '📘', targetHours: 20 })
  const [error, setError] = useState('')

  const handleSubmit = () => {
    setError('')
    if (!form.name || !form.name.trim()) {
      setError('Please enter a subject name')
      return
    }
    const th = Number(form.targetHours)
    if (!th || th <= 0) {
      setError('Target hours must be a number greater than 0')
      return
    }

    try {
      const ok = typeof onAdd === 'function' ? onAdd(form) : false
      if (ok) {
        if (typeof onClose === 'function') onClose()
      } else {
        setError('Could not add subject. Please check your input.')
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
          Add New Subject
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              className="input"
              style={{ width: 60 }}
              value={form.emoji}
              onChange={e => setForm({ ...form, emoji: e.target.value })}
              placeholder="📘"
            />
            <input
              className="input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Subject name (e.g. French Language)"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>
              Target hours to reach goal
            </label>
            <input
              className="input"
              type="number"
              value={form.targetHours}
              onChange={e => setForm({ ...form, targetHours: e.target.value })}
              min={1}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
              Add Subject
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
