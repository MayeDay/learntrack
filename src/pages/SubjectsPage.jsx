import { useState } from 'react'
import { useSubjects } from '../context/SubjectsContext'
import AddSubjectModal from '../components/AddSubjectModal'
import ProgressBar from '../components/ProgressBar'

export default function SubjectsPage({ onOpenSubject, showToast }) {
  const { subjects, addSubject } = useSubjects()
  const [showAdd, setShowAdd] = useState(false)

  const handleAdd = form => {
    const ok = addSubject(form)
    if (ok) showToast('Subject added!')
    return ok
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
      >
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 900 }}>
          My <span style={{ color: '#f59e0b' }}>Subjects</span>
        </h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          + New Subject
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {subjects.map(s => {
          const pct      = Math.min(100, Math.round((s.totalHours / s.targetHours) * 100))
          const done     = s.assignments.filter(a => a.done).length
          const avgScore = s.scores.length
            ? Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length)
            : null

          return (
            <div
              key={s.id}
              className="card subject-card"
              onClick={() => onOpenSubject(s)}
              style={{ borderTop: `3px solid ${s.color}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: s.color + '22',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {s.emoji}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 16 }}>{s.name}</p>
                  <p style={{ color: '#555', fontSize: 13 }}>{s.assignments.length} assignments</p>
                </div>
              </div>

              <ProgressBar value={pct} color={s.color} height={8} />

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 14px' }}>
                <span style={{ color: '#666', fontSize: 12 }}>
                  {s.totalHours}h / {s.targetHours}h
                </span>
                <span style={{ color: s.color, fontWeight: 600, fontSize: 13 }}>{pct}%</span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <span className="tag" style={{ background: '#1e1e28', color: '#888' }}>
                  ✅ {done}/{s.assignments.length} done
                </span>
                {avgScore && (
                  <span className="tag" style={{ background: s.color + '22', color: s.color }}>
                    ⭐ {avgScore} avg
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showAdd && <AddSubjectModal onAdd={handleAdd} onClose={() => setShowAdd(false)} />}
    </div>
  )
}
