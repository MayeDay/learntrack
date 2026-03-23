export const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444']

export const initialSubjects = [
  {
    id: 1,
    name: 'Python Programming',
    color: '#f59e0b',
    emoji: '🐍',
    totalHours: 12,
    targetHours: 40,
    assignments: [
      { id: 1, title: 'Intro to Variables',  done: true,  due: '2025-03-01' },
      { id: 2, title: 'Loops & Functions',   done: true,  due: '2025-03-10' },
      { id: 3, title: 'OOP Basics',          done: false, due: '2025-03-20' },
      { id: 4, title: 'Final Project',       done: false, due: '2025-04-01' },
    ],
    scores: [72, 80, 88],
  },
  {
    id: 2,
    name: 'Spanish Language',
    color: '#10b981',
    emoji: '🇪🇸',
    totalHours: 8,
    targetHours: 30,
    assignments: [
      { id: 1, title: 'Greetings & Phrases',    done: true,  due: '2025-03-05' },
      { id: 2, title: 'Present Tense Verbs',    done: false, due: '2025-03-18' },
      { id: 3, title: 'Conversation Practice',  done: false, due: '2025-03-25' },
    ],
    scores: [65, 74],
  },
  {
    id: 3,
    name: 'Music Theory',
    color: '#3b82f6',
    emoji: '🎵',
    totalHours: 5,
    targetHours: 20,
    assignments: [
      { id: 1, title: 'Reading Sheet Music', done: true,  due: '2025-03-08' },
      { id: 2, title: 'Scales & Chords',     done: false, due: '2025-03-22' },
    ],
    scores: [80],
  },
]
