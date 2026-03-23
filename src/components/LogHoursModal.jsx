import { useState } from 'react'

export default function LogHoursModal({ subject, onLog, onClose }) {
  const [form, setForm] = useState({ hours: '', score: '' })
  const [error, setError] = useState('')

  const handleSubmit = () => {
    setError('')
    const h = parseFloat(form.hours)
    if (!h || h <= 0) {
      setError('Please enter hours greater than 0')
      return
    }
    if (form.score && form.score !== '' ) {
      const sc = Number(form.score)
      if (isNaN(sc) || sc < 0 || sc > 100) {
        setError('Score must be a number between 0 and 100')
        return
      }
    }

    try {
      const ok = typeof onLog === 'function' ? onLog(form) : false
      if (ok) {
        if (typeof onClose === 'function') onClose()
      } else {
        setError('Could not log session. Please check your input.')
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
            marginBottom: 8,
          }}
        >
          Log Study Session
        </h2>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>For: {subject?.name}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>
              Hours studied
            </label>
            <input
              className="input"
              type="number"
              value={form.hours}
              onChange={e => setForm({ ...form, hours: e.target.value })}
              placeholder="e.g. 1.5"
              step="0.5"
              min="0"
            />
          </div>

          <div>
            <label style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 6 }}>
              Score / grade (optional, 0–100)
            </label>
            <input
              className="input"
              type="number"
              value={form.score}
              onChange={e => setForm({ ...form, score: e.target.value })}
              placeholder="e.g. 85"
              min="0"
              max="100"
            />
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit}>
              Log Session
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
