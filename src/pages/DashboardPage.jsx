import { useSubjects } from '../context/SubjectsContext'
import ProgressBar from '../components/ProgressBar'

export default function DashboardPage({ onNavigate, onOpenSubject }) {
  const { subjects } = useSubjects()

  const totalHoursAll   = subjects.reduce((a, s) => a + s.totalHours, 0)
  const totalTargetAll  = subjects.reduce((a, s) => a + s.targetHours, 0)
  const totalDone       = subjects.reduce((a, s) => a + s.assignments.filter(x => x.done).length, 0)
  const totalAssignments = subjects.reduce((a, s) => a + s.assignments.length, 0)
  const overallProgress = totalTargetAll > 0 ? Math.round((totalHoursAll / totalTargetAll) * 100) : 0

  const upcoming = subjects
    .flatMap(s =>
      s.assignments
        .filter(a => !a.done)
        .map(a => ({ ...a, subject: s.name, color: s.color, emoji: s.emoji, subjectId: s.id }))
    )
    .sort((a, b) => new Date(a.due) - new Date(b.due))
    .slice(0, 5)

  const stats = [
    { label: 'Total Hours',      value: totalHoursAll,   suffix: 'h', sub: `of ${totalTargetAll}h target`, color: '#f59e0b' },
    { label: 'Overall Progress', value: overallProgress, suffix: '%', sub: 'toward all goals',             color: '#10b981' },
    { label: 'Tasks Done',       value: totalDone,       suffix: '',  sub: `of ${totalAssignments} total`, color: '#3b82f6' },
    { label: 'Subjects',         value: subjects.length, suffix: '',  sub: 'active tracks',                color: '#8b5cf6' },
  ]

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
      >
        <div>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>Good to see you back 👋</p>
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 36,
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Your Learning
            <br />
            <span style={{ color: '#f59e0b' }}>Dashboard</span>
          </h1>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('subjects')}>
          + New Subject
        </button>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {stats.map((s, i) => (
          <div key={i} className="card">
            <p
              style={{
                color: '#666',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 8,
              }}
            >
              {s.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span className="stat-num" style={{ color: s.color }}>
                {s.value}
              </span>
              <span style={{ color: '#666', fontSize: 18 }}>{s.suffix}</span>
            </div>
            <p style={{ color: '#555', fontSize: 12, marginTop: 4 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
        {/* Subject progress */}
        <div className="card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <span className="section-title">Subject Progress</span>
            <button
              className="btn btn-ghost"
              style={{ fontSize: 12 }}
              onClick={() => onNavigate('subjects')}
            >
              View All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {subjects.map(s => {
              const pct  = Math.min(100, Math.round((s.totalHours / s.targetHours) * 100))
              const done = s.assignments.filter(a => a.done).length
              return (
                <div key={s.id} style={{ cursor: 'pointer' }} onClick={() => onOpenSubject(s)}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{s.emoji}</span>
                      <span style={{ fontWeight: 500, fontSize: 15 }}>{s.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: '#666', fontSize: 13 }}>
                        {done}/{s.assignments.length} tasks
                      </span>
                      <span style={{ color: s.color, fontWeight: 600, fontSize: 14 }}>{pct}%</span>
                    </div>
                  </div>

                  <ProgressBar value={pct} color={s.color} height={6} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ color: '#555', fontSize: 11 }}>{s.totalHours}h studied</span>
                    <span style={{ color: '#555', fontSize: 11 }}>{s.targetHours}h goal</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming tasks */}
        <div className="card">
          <span className="section-title" style={{ display: 'block', marginBottom: 20 }}>
            Upcoming Tasks
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upcoming.length === 0 && (
              <p style={{ color: '#555', fontSize: 14 }}>All caught up! 🎉</p>
            )}
            {upcoming.map(a => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  background: '#1e1e28',
                  borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>{a.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {a.title}
                  </p>
                  <p style={{ fontSize: 11, color: '#555' }}>{a.subject}</p>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: a.color,
                    background: a.color + '22',
                    padding: '2px 6px',
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                >
                  {a.due
                    ? new Date(a.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'No date'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
