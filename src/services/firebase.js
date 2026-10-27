import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, set, get, child, remove } from 'firebase/database';
import { DEFAULT_STUDENTS, DEFAULT_QUIZ_KEYS } from './seedData.js';

const firebaseConfig = {
  projectId: "gptk-quiz",
  databaseURL: "https://gptk-quiz-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "gptk-quiz.firebasestorage.app",
  apiKey: "AIzaSyA9ZCIUwY9y-yjZewp8z-6gfhJSftyslco",
  authDomain: "gptk-quiz.firebaseapp.com",
  appId: "1:709424873311:web:ddb7532cf293ac6057c0ea"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const rtdb = getDatabase(app);

// Initialize Default Seeds in RTDB and clean old dummy test data
export async function initializeDatabaseSeed() {
  const DB_RESET_KEY = 'gptk_db_cleaned_vasu_admin_v6';
  const hasCleaned = localStorage.getItem(DB_RESET_KEY);

  try {
    if (!hasCleaned) {
      // Clean reset: only student Vasu, NO quizzes, clear all old submissions
      await set(ref(rtdb, 'students'), DEFAULT_STUDENTS);
      await set(ref(rtdb, 'quizzes'), null);
      await set(ref(rtdb, 'quiz_keys'), null);
      await set(ref(rtdb, 'results'), null);

      localStorage.setItem('gptk_students', JSON.stringify(DEFAULT_STUDENTS));
      localStorage.removeItem('gptk_quizzes');
      localStorage.removeItem('gptk_quiz_keys');
      localStorage.removeItem('gptk_results');
      localStorage.setItem(DB_RESET_KEY, 'true');
    } else {
      const studentsSnap = await get(child(ref(rtdb), 'students'));
      if (!studentsSnap.exists()) {
        await set(ref(rtdb, 'students'), DEFAULT_STUDENTS);
      }
    }
  } catch (err) {
    console.warn("RTDB Online seed fallback to localStorage:", err?.message || err);
    if (!localStorage.getItem('gptk_students')) {
      localStorage.setItem('gptk_students', JSON.stringify(DEFAULT_STUDENTS));
    }
  }
}

// Subscribe to Quizzes list in real-time
export function subscribeToQuizzes(callback) {
  const quizRef = ref(rtdb, 'quizzes');
  const unsubscribe = onValue(
    quizRef,
    (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : {});
    },
    (error) => {
      console.warn("Quizzes RTDB subscription error, reading local:", error);
      const local = localStorage.getItem('gptk_quizzes');
      callback(local ? JSON.parse(local) : {});
    }
  );
  return unsubscribe;
}

// Subscribe to Student Results
export function subscribeToResults(callback) {
  const resultsRef = ref(rtdb, 'results');
  return onValue(
    resultsRef,
    (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : {});
    },
    () => {
      const local = localStorage.getItem('gptk_results');
      callback(local ? JSON.parse(local) : {});
    }
  );
}

// Submit Quiz Result
export async function submitQuizResult(rollNo, resultData) {
  const key = `${rollNo}_${resultData.quizId || 'quiz'}`;
  try {
    await set(ref(rtdb, `results/${key}`), resultData);
  } catch (e) {
    console.warn("Saving result to localStorage due to network/rules:", e);
  }
  const existing = JSON.parse(localStorage.getItem('gptk_results') || '{}');
  existing[key] = resultData;
  localStorage.setItem('gptk_results', JSON.stringify(existing));
}

// Delete a quiz pack from RTDB + localStorage
export async function deleteQuizPack(quizId) {
  try {
    await remove(ref(rtdb, `quizzes/${quizId}`));
    await remove(ref(rtdb, `quiz_keys/${quizId}`));
  } catch (e) {
    console.warn("RTDB delete fallback:", e);
  }
  const local = JSON.parse(localStorage.getItem('gptk_quizzes') || '{}');
  delete local[quizId];
  localStorage.setItem('gptk_quizzes', JSON.stringify(local));
  const keys = JSON.parse(localStorage.getItem('gptk_quiz_keys') || '{}');
  delete keys[quizId];
  localStorage.setItem('gptk_quiz_keys', JSON.stringify(keys));
}

// Save quiz questions + keys to RTDB + localStorage
export async function saveQuizQuestions(quizId, questions, answerKeys) {
  try {
    await set(ref(rtdb, `quizzes/${quizId}/questions`), questions);
    await set(ref(rtdb, `quiz_keys/${quizId}`), answerKeys);
  } catch (e) {
    console.warn("RTDB save fallback:", e);
  }
  // Sync to localStorage
  const local = JSON.parse(localStorage.getItem('gptk_quizzes') || '{}');
  if (local[quizId]) local[quizId].questions = questions;
  localStorage.setItem('gptk_quizzes', JSON.stringify(local));
  const keys = JSON.parse(localStorage.getItem('gptk_quiz_keys') || '{}');
  keys[quizId] = answerKeys;
  localStorage.setItem('gptk_quiz_keys', JSON.stringify(keys));
}
