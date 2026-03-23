import { useState } from 'react'
import { SubjectsProvider } from './context/SubjectsContext'
import { useToast } from './hooks/useToast'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import DashboardPage from './pages/DashboardPage'
import SubjectsPage from './pages/SubjectsPage'
import SubjectDetailPage from './pages/SubjectDetailPage'
import AnalyticsPage from './pages/AnalyticsPage'

function AppInner() {
  const [activeView, setActiveView]         = useState('dashboard')
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)
  const { toast, showToast }                = useToast()

  const openSubject = subject => {
    setSelectedSubjectId(subject.id)
    setActiveView('subject')
  }

  const navigate = view => {
    setActiveView(view)
    if (view !== 'subject') setSelectedSubjectId(null)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar activeView={activeView} onNavigate={navigate} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 32px' }}>
        {activeView === 'dashboard' && (
          <DashboardPage onNavigate={navigate} onOpenSubject={openSubject} />
        )}
        {activeView === 'subjects' && (
          <SubjectsPage onOpenSubject={openSubject} showToast={showToast} />
        )}
        {activeView === 'subject' && selectedSubjectId && (
          <SubjectDetailPage
            subjectId={selectedSubjectId}
            onBack={() => navigate('subjects')}
            showToast={showToast}
          />
        )}
        {activeView === 'analytics' && <AnalyticsPage />}
      </div>

      <Toast toast={toast} />
    </div>
  )
}

export default function App() {
  return (
    <SubjectsProvider>
      <AppInner />
    </SubjectsProvider>
  )
}
