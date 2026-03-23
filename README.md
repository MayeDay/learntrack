# LearnTrack

A React dashboard for adult self-learners to track subjects, goals, assignments, and study sessions.

## Project Structure

```
learntrack/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                        # Entry point
    ├── App.jsx                         # Root component + client-side routing
    ├── styles/
    │   └── global.css                  # All global styles
    ├── data/
    │   └── subjects.js                 # Seed data + COLORS constant
    ├── context/
    │   └── SubjectsContext.jsx         # Global state (subjects CRUD)
    ├── hooks/
    │   └── useToast.js                 # Toast notification hook
    ├── components/
    │   ├── Navbar.jsx                  # Top navigation bar
    │   ├── Toast.jsx                   # Toast notification display
    │   ├── ProgressBar.jsx             # Reusable progress bar
    │   ├── AddSubjectModal.jsx         # Modal: add a new subject
    │   ├── AddAssignmentModal.jsx      # Modal: add an assignment
    │   └── LogHoursModal.jsx           # Modal: log a study session
    └── pages/
        ├── DashboardPage.jsx           # Overview stats + subject progress
        ├── SubjectsPage.jsx            # Subject card grid
        ├── SubjectDetailPage.jsx       # Single subject: progress + assignments
        └── AnalyticsPage.jsx           # Charts + performance summary
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

## Features

- 📚 **Subject management** — add subjects with emoji, colour, and an hour goal
- 🎯 **Goal tracking** — visual progress bars per subject
- ✅ **Assignment tracker** — add tasks with due dates, check them off
- 📊 **Analytics** — bar chart, pie chart, and per-subject performance summary
- ⏱️ **Study session logging** — log hours + optional score per session
- 🔔 **Upcoming tasks** — sorted due-date list across all subjects

## Production Considerations

| Concern | Current (prototype) | Production recommendation |
|---------|--------------------|-----------------------------|
| Data persistence | React state (resets on refresh) | PostgreSQL / Supabase |
| Authentication | Simulated | Auth.js / Clerk / Firebase Auth |
| Hosting | `npm run dev` locally | Vercel / Netlify / Render |
| API | None (client-only) | Node/Express or Next.js API routes |
