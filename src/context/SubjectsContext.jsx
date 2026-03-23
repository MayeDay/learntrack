import { createContext, useContext, useState, useCallback } from 'react'
import { initialSubjects, COLORS } from '../data/subjects'

const SubjectsContext = createContext(null)

const generateId = () => Date.now() + Math.random()

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState(initialSubjects)

  const addSubject = useCallback(({ name, emoji, targetHours }) => {
    if (!name.trim()) return false
    setSubjects(prev => [
      ...prev,
      {
        id: generateId(),
        name,
        emoji,
        color: COLORS[prev.length % COLORS.length],
        totalHours: 0,
        targetHours: Number(targetHours),
        assignments: [],
        scores: [],
      },
    ])
    return true
  }, [])

  const addAssignment = useCallback((subjectId, { title, due }) => {
    if (!title.trim()) return false
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, assignments: [...s.assignments, { id: generateId(), title, done: false, due }] }
          : s
      )
    )
    return true
  }, [])

  const toggleAssignment = useCallback((subjectId, assignmentId) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, assignments: s.assignments.map(a => a.id === assignmentId ? { ...a, done: !a.done } : a) }
          : s
      )
    )
  }, [])

  const logSession = useCallback((subjectId, { hours, score }) => {
    const h = parseFloat(hours)
    const sc = parseFloat(score)
    if (!h || h <= 0) return false
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, totalHours: s.totalHours + h, scores: sc ? [...s.scores, sc] : s.scores }
          : s
      )
    )
    return true
  }, [])

  return (
    <SubjectsContext.Provider value={{ subjects, addSubject, addAssignment, toggleAssignment, logSession }}>
      {children}
    </SubjectsContext.Provider>
  )
}

export function useSubjects() {
  const ctx = useContext(SubjectsContext)
  if (!ctx) throw new Error('useSubjects must be used inside SubjectsProvider')
  return ctx
}
