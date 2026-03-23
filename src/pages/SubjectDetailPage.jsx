import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useSubjects } from '../context/SubjectsContext'
import AddAssignmentModal from '../components/AddAssignmentModal'
import LogHoursModal from '../components/LogHoursModal'
import ProgressBar from '../components/ProgressBar'

export default function SubjectDetailPage({ subjectId, onBack, showToast }) {
  const { subjects, addAssignment, toggleAssignment, logSession } = useSubjects()
  const subject = subjects.find(s => s.id === subjectId)

  const [showAddAssignment, setShowAddAssignment] = useState(false)
  const [showLogHours, setShowLogHours]           = useState(false)

  if (!subject) return null

  const pct = Math.min(100, Math.round((subject.totalHours / subject.targetHours) * 100))

  const handleAddAssignment = form => {
    const ok = addAssignment(subject.id, form)
    if (ok) showToast('Assignment added!')
    return ok
  }

  const handleLogSession = form => {
    const ok = logSession(subject.id, form)
    if (ok) showToast(`+${form.hours}h logged for ${subject.name}!`)
    return ok
  }

  const scoreChartData = subject.scores.map((v, i) => ({ n: `#${i + 1}`, v }))

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <button className="btn btn-ghost" style={{ padding: '8px 12px' }} onClick={onBack}>
          ← Back
        </button>
        <div
          style={{
            width: 44,
            height: 44,
            background: subject.color + '22',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}
        >
          {subject.emoji}
        </div>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900 }}>
            {subject.name}
          </h1>
          <p style={{ color: '#666', fontSize: 14 }}>
            {subject.totalHours}h studied ·{' '}
            {subject.assignments.filter(a => a.done).length}/{subject.assignments.length} tasks done
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" onClick={() => setShowLogHours(true)}>
            + Log Hours
          </button>
          <button className="btn btn-primary" onClick={() => setShowAddAssignment(true)}>
            + Add Task
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Progress */}
        <div className="card">
          <span className="section-title" style={{ display: 'block', marginBottom: 20 }}>
            Progress to Goal
          </span>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div className="stat-num" style={{ color: subject.color, fontSize: 56 }}>{pct}%</div>
            <p style={{ color: '#666', marginTop: 4 }}>
              {subject.totalHours}h of {subject.targetHours}h goal
            </p>
          </div>

          <ProgressBar value={pct} color={subject.color} height={12} />

          {subject.scores.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: '#666', fontSize: 13, marginBottom: 12 }}>Score History</p>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={scoreChartData}>
                  <Bar dataKey="v" fill={subject.color} radius={[4, 4, 0, 0]} />
                  <XAxis
                    dataKey="n"
                    tick={{ fontSize: 11, fill: '#666' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#666' }}
                    axisLine={false}
                    tickLine={false}
                    width={24}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#1e1e28',
                      border: '1px solid #2a2a35',
                      borderRadius: 8,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Assignments */}
        <div className="card">
          <span className="section-title" style={{ display: 'block', marginBottom: 20 }}>
            Assignments
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {subject.assignments.length === 0 && (
              <p style={{ color: '#555', fontSize: 14 }}>No assignments yet. Add one!</p>
            )}
            {subject.assignments.map(a => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  background: '#1e1e28',
                  borderRadius: 10,
                  opacity: a.done ? 0.6 : 1,
                }}
              >
                <button
                  className={`check-btn ${a.done ? 'done' : ''}`}
                  onClick={() => toggleAssignment(subject.id, a.id)}
                >
                  {a.done && <span style={{ color: 'white', fontSize: 12 }}>✓</span>}
                </button>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 14,
                      textDecoration: a.done ? 'line-through' : 'none',
                      color: a.done ? '#555' : '#e8e4dc',
                    }}
                  >
                    {a.title}
                  </p>
                  {a.due && (
                    <p style={{ fontSize: 11, color: '#555' }}>
                      Due{' '}
                      {new Date(a.due).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddAssignment && (
        <AddAssignmentModal onAdd={handleAddAssignment} onClose={() => setShowAddAssignment(false)} />
      )}
      {showLogHours && (
        <LogHoursModal
          subject={subject}
          onLog={handleLogSession}
          onClose={() => setShowLogHours(false)}
        />
      )}
    </div>
  )
}
