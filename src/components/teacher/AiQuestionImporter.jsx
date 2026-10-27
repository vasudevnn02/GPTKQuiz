import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { glassDeep, glassBtn, glassInner } from '../../glass.js';

export default function AiQuestionImporter({ currentQuiz, answerKeys = {}, onClose, onImported }) {
  const [step, setStep] = useState('prompt'); // 'prompt' | 'paste'
  const [topic, setTopic] = useState('Operating Systems & Memory Management');
  const [questionCount, setQuestionCount] = useState(5);
  const [copied, setCopied] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [parseError, setParseError] = useState('');

  const generatedPrompt = `Create exactly ${questionCount} multiple choice questions on "${topic.trim() || 'Computer Science'}".
Format every question starting with 1, 2, 3 like this:

1. [Question statement here]
A) [First option]
B) [Second option]
C) [Third option]
D) [Fourth option]
Answer: A

2. [Next question statement]
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]
Answer: B

(Continue numbering consecutively from 1 to ${questionCount}).`;

  const handleCopyAndProceed = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = generatedPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setStep('paste');
    }, 600);
  };

  const parsePastedContent = (raw) => {
    if (!raw.trim()) {
      setParsedQuestions([]);
      setParseError('');
      return;
    }

    try {
      if (raw.trim().startsWith('[') || raw.trim().startsWith('{')) {
        const clean = raw.replace(/```json|```/g, '').trim();
        const obj = JSON.parse(clean);
        const list = Array.isArray(obj) ? obj : obj.questions || [];
        if (list.length > 0) {
          setParsedQuestions(list.map((q, idx) => ({
            id: `ai_${Date.now()}_${idx}`,
            text: q.text || q.question || `Question ${idx + 1}`,
            options: q.options || ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: typeof q.correct === 'number' ? q.correct : 0,
          })));
          setParseError('');
          return;
        }
      }
    } catch {}

    const blocks = raw.split(/(?=(?:^|\n)\s*(?:\d+[\.\)]|Question\s+\d+[:\.]))/i).filter(b => b.trim());
    const results = [];

    blocks.forEach((block, idx) => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      const qLine = lines[0].replace(/^\s*(?:\d+[\.\)]|Question\s+\d+[:\.])\s*/i, '').trim();
      const options = [];
      let correct = 0;

      lines.slice(1).forEach(l => {
        const optMatch = l.match(/^[A-Da-d][\)\.\:\-]\s*(.+)/);
        if (optMatch) {
          options.push(optMatch[1].trim());
        }
        const ansMatch = l.match(/(?:Answer|Correct|Key)\s*[:\-]?\s*([A-Da-d])/i);
        if (ansMatch) {
          const char = ansMatch[1].toUpperCase();
          correct = char.charCodeAt(0) - 65;
        }
      });

      if (qLine && options.length >= 2) {
        while (options.length < 4) options.push(`Option ${String.fromCharCode(65 + options.length)}`);
        results.push({
          id: `ai_${Date.now()}_${idx}`,
          text: qLine,
          options: options.slice(0, 4),
          correct: (correct >= 0 && correct <= 3) ? correct : 0,
        });
      }
    });

    if (results.length > 0) {
      setParsedQuestions(results);
      setParseError('');
    } else {
      setParsedQuestions([]);
      setParseError('Could not detect numbered questions. Paste questions formatted like: 1. Question... A) ... B) ... Answer: A');
    }
  };

  const handleImport = async () => {
    if (parsedQuestions.length === 0) return;
    const quizId = currentQuiz?.id || 'quiz_fsd_01';
    const updatedQuestions = [...(currentQuiz?.questions || []), ...parsedQuestions];
    const updatedKeys = { ...answerKeys };
    parsedQuestions.forEach(q => { updatedKeys[q.id] = q.correct; });

    try {
      await set(ref(rtdb, `quizzes/${quizId}/questions`), updatedQuestions);
      await set(ref(rtdb, `quiz_keys/${quizId}`), updatedKeys);
    } catch (err) {
      console.warn("RTDB import save fallback:", err);
    }

    if (onImported) onImported();
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(24px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', ...glassDeep, borderRadius: '26px', padding: '34px' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h3 style={{ fontSize: '21px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✦</span> AI Prompt & Question Importer
            </h3>
            <p style={{ fontSize: '12px', color: 'rgba(30, 41, 59, 0.65)', marginTop: '3px' }}>
              {step === 'prompt' ? 'Configure topic & question count, then auto-copy prompt.' : 'Paste AI output below to parse and import.'}
            </p>
          </div>
          <button onClick={onClose} style={{ ...glassBtn, padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700 }}>✕ Close</button>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
          <button onClick={() => setStep('prompt')} style={{ flex: 1, padding: '10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, background: step === 'prompt' ? '#0f172a' : 'rgba(255,255,255,0.6)', color: step === 'prompt' ? '#fff' : '#0f172a', border: '1px solid rgba(255,255,255,0.9)', boxShadow: step === 'prompt' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none' }}>
            1. Build & Copy Prompt
          </button>
          <button onClick={() => setStep('paste')} style={{ flex: 1, padding: '10px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, background: step === 'paste' ? '#0f172a' : 'rgba(255,255,255,0.6)', color: step === 'paste' ? '#fff' : '#0f172a', border: '1px solid rgba(255,255,255,0.9)', boxShadow: step === 'paste' ? '0 4px 12px rgba(0,0,0,0.1)' : 'none' }}>
            2. Paste AI Questions & Import
          </button>
        </div>

        {/* ── STEP 1: PROMPT BUILDER ── */}
        {step === 'prompt' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Assessment Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Python Functions, Cloud Architecture, DBMS"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                How Many Questions?
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[3, 5, 10, 15, 20].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 800,
                      background: questionCount === cnt ? '#0f172a' : 'rgba(255,255,255,0.7)',
                      border: `1px solid ${questionCount === cnt ? '#0f172a' : 'rgba(255,255,255,0.9)'}`,
                      color: questionCount === cnt ? '#ffffff' : '#0f172a',
                      boxShadow: questionCount === cnt ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                  >
                    {cnt} Questions
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Generated Prompt (Ready for ChatGPT / Gemini)
              </label>
              <pre style={{ ...glassInner, borderRadius: '14px', padding: '16px', fontSize: '12px', color: '#0f172a', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto', lineHeight: '1.5', fontWeight: 500 }}>
                {generatedPrompt}
              </pre>
            </div>

            <button
              onClick={handleCopyAndProceed}
              style={{ ...glassBtn, padding: '12px 24px', borderRadius: '14px', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0f172a', color: '#ffffff' }}
            >
              <span>{copied ? '✓ Copied to Clipboard!' : 'Copy Prompt & Open Paste Box'}</span>
            </button>
          </div>
        )}

        {/* ── STEP 2: PASTE BOX & AUTO PARSER ── */}
        {step === 'paste' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Paste Box (Paste from AI starting with 1, 2, 3...)
              </label>
              <textarea
                rows={7}
                value={pastedText}
                onChange={e => {
                  setPastedText(e.target.value);
                  parsePastedContent(e.target.value);
                }}
                placeholder={`1. What is the main purpose of an OS?\nA) Manage hardware and software\nB) Design graphic UI\nC) Create documents\nD) Send emails\nAnswer: A\n\n2. Next question...`}
                style={{ width: '100%', resize: 'vertical', fontSize: '13px', lineHeight: '1.5' }}
              />
            </div>

            {parseError && (
              <div style={{ fontSize: '12px', color: '#b45309', background: 'rgba(245, 158, 11, 0.1)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.25)', fontWeight: 600 }}>
                {parseError}
              </div>
            )}

            {parsedQuestions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.7)', paddingTop: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                  Parsed Questions ({parsedQuestions.length} detected):
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
                  {parsedQuestions.map((q, idx) => (
                    <div key={idx} style={{ ...glassInner, borderRadius: '14px', padding: '14px 16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                        {idx + 1}. {q.text}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        {q.options.map((opt, i) => (
                          <div key={i} style={{ fontSize: '12px', padding: '6px 10px', borderRadius: '8px', background: i === q.correct ? '#0f172a' : 'rgba(255,255,255,0.7)', color: i === q.correct ? '#ffffff' : '#0f172a', fontWeight: i === q.correct ? 700 : 500, border: '1px solid rgba(255,255,255,0.9)' }}>
                            {String.fromCharCode(65 + i)}. {opt} {i === q.correct && '✓'}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleImport}
                  style={{ ...glassBtn, padding: '12px 24px', borderRadius: '12px', fontWeight: 800, fontSize: '14px', alignSelf: 'flex-start', marginTop: '6px', background: '#0f172a', color: '#ffffff' }}
                >
                  Import All ({parsedQuestions.length}) Questions to Bank
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
