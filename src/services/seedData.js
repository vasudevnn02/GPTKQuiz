export const DEFAULT_STUDENTS = {
  "197CS24045CS": {
    rollNo: "197CS24045CS",
    name: "Vasu",
    passwordHash: "Vasu@290908",
    course: "Computer Science and Engineering",
    createdAt: 1793116489874,
    status: "active"
  }
};

export const DEFAULT_QUIZ = {
  id: "quiz_fsd_01",
  title: "Computer Science",
  course: "CSE Department",
  description: "Comprehensive 15-minute proctored assessment for Computer Science examination.",
  windowStart: "10:00 AM",
  windowEnd: "05:00 PM",
  date: "Oct 28, 2026",
  durationMinutes: 15,
  totalQuestions: 5,
  status: "active",
  questions: [
    {
      id: "q1",
      text: "What is the full form of FSD in modern software engineering?",
      options: [
        "Full Stack Development",
        "Fast Software Design",
        "File System Directory",
        "Full Service Deployment"
      ]
    },
    {
      id: "q2",
      text: "Which architectural pattern cleanly separates UI components from server state in React?",
      options: [
        "Model-View-Controller (MVC)",
        "Monolithic Database Engine",
        "Custom Hook & Component Composition",
        "Static HTML Frame"
      ]
    },
    {
      id: "q3",
      text: "Which Firebase service provides real-time event synchronization using WebSockets?",
      options: [
        "Cloud Functions",
        "Firebase Realtime Database",
        "Google Cloud Storage",
        "Firebase Hosting"
      ]
    },
    {
      id: "q4",
      text: "What is the primary rationale for enforcing Jakob's Law in UI/UX engineering?",
      options: [
        "Users transfer mental models and interaction habits from familiar platforms",
        "It minimizes the size of JavaScript bundles",
        "It increases CPU clock performance",
        "It mandates strict monochrome colors"
      ]
    },
    {
      id: "q5",
      text: "In client-side anti-cheat proctoring, which browser event monitors when a student switches tabs?",
      options: [
        "resize event",
        "load event",
        "contextmenu event",
        "visibilitychange and blur events"
      ]
    }
  ]
};

export const DEFAULT_QUIZ_KEYS = {
  quiz_fsd_01: {
    q1: 0,
    q2: 2,
    q3: 1,
    q4: 0,
    q5: 3
  }
};
