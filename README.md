# GPTKQuiz

Proctored Examination Portal built with React 18, Vite, Firebase Realtime Database, YouTube Dark UI (Jakob's Law), 100% Native Inline SVG Icons, and modular components (< 150 lines each).

## Features
- **Register No + Password Authentication**: Direct candidate verification (No Google / Gmail sign-in required). Default student: `197CS24045CS` / `Vasu` / `Vasu@290908`.
- **Teacher Studio**: Master admin proctor controls (`admin@gptkquiz.edu` / `CSE@2026`).
- **Flexible Examination Window (10:00 AM – 5:00 PM)**: Students can take tests any time inside the 10:00 AM – 5:00 PM window. 15-minute countdown starts on exam entry and is automatically capped if joined near window close.
- **YouTube Dark UX (Jakob's Law)**: Video thumbnail style cards, theater mode exam arena, right-rail palette.
- **100% SVG Icons**: Zero emoji, zero external image files.
- **Strictly Modular Components**: Every component strictly under 150 lines.

## Development
```bash
npm install
npm run dev
npm run build
```
