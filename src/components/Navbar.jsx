export default function Navbar({ activeView, onNavigate }) {
  return (
    <div style={{ borderBottom: '1px solid #1e1e28', padding: '0 32px' }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: '#f59e0b',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            📚
          </div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 20 }}>
            LearnTrack
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['dashboard', 'subjects', 'analytics'].map(view => (
            <button
              key={view}
              className={`nav-btn ${activeView === view ? 'active' : ''}`}
              onClick={() => onNavigate(view)}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
