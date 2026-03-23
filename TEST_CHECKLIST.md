# LearnTrack Testing Checklist

## Navigation
- [ ] Navbar: `Dashboard`, `Subjects`, `Analytics` buttons navigate correctly
- [ ] App routing: views `dashboard`, `subjects`, `subject`, `analytics` display correctly and `selectedSubjectId` is set/cleared

## Dashboard
- [ ] `+ New Subject` opens `Subjects` view
- [ ] `View All →` opens `Subjects` view
- [ ] Clicking a subject card opens Subject Detail with correct subject loaded
- [ ] Stat cards: Total Hours, Overall Progress, Tasks Done, Subjects show correct calculations
- [ ] Progress bars match calculated percentages
- [ ] Upcoming tasks list: shows emoji, title, subject, due-date formatting; empty-state shown

## Subjects Page
- [ ] `+ New Subject` opens `AddSubjectModal`
- [ ] Clicking a subject card opens Subject Detail
- [ ] Card tags display assignments count and average score when present

## Subject Detail
- [ ] `← Back` returns to `subjects` view
- [ ] `+ Log Hours` opens `LogHoursModal`
- [ ] `+ Add Task` opens `AddAssignmentModal`
- [ ] Progress percent, totalHours/targetHours and ProgressBar match calculations
- [ ] Score chart renders when `scores.length > 0` and tooltips show values
- [ ] Assignments list: title, optional due, strike-through & opacity when done
- [ ] Assignment toggle button flips `done` state and updates UI and stats

## Add Subject Modal (`AddSubjectModal`)
- [ ] Emoji input accepts emoji/text
- [ ] Name input accepts subject name; Enter submits
- [ ] `targetHours` number input accepts values >= 1
- [ ] `Cancel` closes modal; backdrop click closes modal; clicking modal body does not
- [ ] `Add Subject` validates (reject empty name), calls `addSubject`, and shows toast on success
- [ ] `targetHours` coerced to number correctly

## Add Assignment Modal (`AddAssignmentModal`)
- [ ] Title input accepts text; Enter submits
- [ ] Due date input accepts valid dates (optional)
- [ ] `Cancel` closes modal; backdrop click closes modal
- [ ] `Add Task` validates (reject empty title) and calls `addAssignment` and shows toast on success

## Log Hours Modal (`LogHoursModal`)
- [ ] `hours` input accepts numeric (step 0.5), must be > 0
- [ ] `score` input accepts 0–100 (optional)
- [ ] `Cancel` closes modal; backdrop click closes modal
- [ ] `Log Session` validates and calls `logSession`, updates `totalHours` and `scores`, shows toast on success

## Toasts
- [ ] Toast appears on subject add, assignment add, session log
- [ ] Toast message text is correct and disappears after ~3s
- [ ] No success toast shown for invalid actions

## Context / State Logic
- [ ] `addSubject` rejects blank `name` and sets `color`, `totalHours=0`, `assignments=[]`, `scores=[]`
- [ ] `addAssignment` rejects blank `title`, adds assignment with `done:false`
- [ ] `toggleAssignment` toggles `done` and updates task counts
- [ ] `logSession` rejects zero/negative hours, increments `totalHours`, records `score` when provided

## Analytics
- [ ] Hours bar chart renders correct `hours` and `target` values per subject
- [ ] Pie chart renders correct time distribution and colors
- [ ] Performance summary: goal completion %, avg score, and hours are correct

## UI / Visual
- [ ] `ProgressBar` clamps value 0–100 and fill color matches subject color
- [ ] Card borders and tag colors reflect subject `color`
- [ ] Layout responsive: grid cards and charts adapt on narrow viewports

## Accessibility & Keyboard
- [ ] Tab order in modals is logical and reaches inputs and buttons
- [ ] Enter key submits where implemented (modal inputs)
- [ ] `Esc` key behavior: (note) not implemented — consider adding

## Edge Cases
- [ ] Add subject with only emoji, long name, non-integer `targetHours`
- [ ] Add assignment without due date
- [ ] Log fractional hours and very large values
- [ ] Rapidly toggle assignment multiple times (race condition check)
- [ ] Add many subjects to validate `COLORS` cycling
- [ ] Refresh page resets to `initialSubjects` (confirm in-memory only)

## Notes / Missing Features
- [ ] No subject delete action — verify expected behavior
- [ ] No persistence — consider localStorage or backend for persistence

---

Generated from code inspection of `src/` components and context. If you want an exported test suite (Playwright or Cypress) I can scaffold automated tests next.