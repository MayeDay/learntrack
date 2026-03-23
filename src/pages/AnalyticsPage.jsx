import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { useSubjects } from '../context/SubjectsContext'

export default function AnalyticsPage() {
  const { subjects } = useSubjects()

  const weeklyData = subjects.map(s => ({
    name: s.name.split(' ')[0],
    hours: s.totalHours,
    target: s.targetHours,
    fill: s.color,
  }))

  const pieData = subjects.map(s => ({
    name: s.name,
    value: s.totalHours,
    fill: s.color,
  }))

  return (
    <div>
      <h1
        style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 36,
          fontWeight: 900,
          marginBottom: 32,
        }}
      >
        Learning <span style={{ color: '#f59e0b' }}>Analytics</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Hours bar chart */}
        <div className="card">
          <span className="section-title" style={{ display: 'block', marginBottom: 20 }}>
            Hours by Subject
          </span>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barGap={4}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: '#1e1e28',
                  border: '1px solid #2a2a35',
                  borderRadius: 8,
                  color: '#e8e4dc',
                }}
              />
              <Bar dataKey="hours" name="Studied" radius={[6, 6, 0, 0]}>
                {weeklyData.map((e, i) => (
                  <Cell key={i} fill={e.fill} />
                ))}
              </Bar>
              <Bar dataKey="target" name="Target" fill="#2a2a35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card">
          <span className="section-title" style={{ display: 'block', marginBottom: 20 }}>
            Time Distribution
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {pieData.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {subjects.map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: s.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13 }}>{s.name.split(' ')[0]}</span>
                  <span style={{ color: '#666', fontSize: 13, marginLeft: 'auto' }}>
                    {s.totalHours}h
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance summary */}
      <div className="card">
        <span className="section-title" style={{ display: 'block', marginBottom: 20 }}>
          Performance Summary
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {subjects.map(s => {
            const avg = s.scores.length
              ? Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length)
              : null
            const pct = Math.min(100, Math.round((s.totalHours / s.targetHours) * 100))

            return (
              <div
                key={s.id}
                style={{
                  background: '#1e1e28',
                  borderRadius: 12,
                  padding: 16,
                  borderLeft: `3px solid ${s.color}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>{s.emoji}</span>
                  <span style={{ fontWeight: 500, fontSize: 14 }}>{s.name.split(' ')[0]}</span>
                </div>
                {[
                  { label: 'Goal completion', value: `${pct}%`,         color: s.color    },
                  { label: 'Avg score',        value: avg ? `${avg}/100` : '—', color: avg ? '#f59e0b' : '#555' },
                  { label: 'Hours logged',     value: `${s.totalHours}h`, color: '#e8e4dc' },
                ].map(row => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      color: '#666',
                      marginBottom: 6,
                    }}
                  >
                    <span>{row.label}</span>
                    <span style={{ color: row.color, fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
