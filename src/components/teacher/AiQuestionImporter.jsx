import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { glassDeep, glassBtn, glassInner } from '../../glass.js';

export default function AiQuestionImporter({ currentQuiz, answerKeys = {}, onClose, onImported, embedded = false }) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Step Indicator */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setStep('prompt')} style={{ flex: 1, padding: '9px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, background: step === 'prompt' ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.06)', color: '#ffffff', border: `1px solid ${step === 'prompt' ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.15)'}` }}>
          1. Build &amp; Copy Prompt
        </button>
        <button onClick={() => setStep('paste')} style={{ flex: 1, padding: '9px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, background: step === 'paste' ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.06)', color: '#ffffff', border: `1px solid ${step === 'paste' ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.15)'}` }}>
          2. Paste &amp; Import
        </button>
      </div>

      {/* ── STEP 1 ── */}
      {step === 'prompt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Assessment Topic</label>
            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. Python Functions, Cloud Architecture, DBMS" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>How Many Questions?</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[3, 5, 10, 15, 20].map(cnt => (
                <button key={cnt} type="button" onClick={() => setQuestionCount(cnt)} style={{ padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, background: questionCount === cnt ? 'rgba(56,189,248,0.25)' : 'rgba(255,255,255,0.06)', border: `1px solid ${questionCount === cnt ? 'rgba(56,189,248,0.45)' : 'rgba(255,255,255,0.15)'}`, color: '#ffffff' }}>
                  {cnt}Q
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Generated Prompt</label>
            <pre style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '14px', padding: '14px', fontSize: '11px', color: '#ffffff', whiteSpace: 'pre-wrap', maxHeight: '160px', overflowY: 'auto', lineHeight: '1.5' }}>{generatedPrompt}</pre>
          </div>
          <button onClick={handleCopyAndProceed} style={{ ...glassBtn, padding: '11px 22px', borderRadius: '12px', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {copied ? '✓ Copied!' : 'Copy Prompt & Go to Paste Box'}
          </button>
        </div>
      )}

      {/* ── STEP 2 ── */}
      {step === 'paste' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Paste AI Output (numbered 1. 2. 3...)</label>
            <textarea rows={7} value={pastedText} onChange={e => { setPastedText(e.target.value); parsePastedContent(e.target.value); }} placeholder={'1. What is the main purpose of an OS?\nA) Manage hardware\nB) Design UI\nC) Create docs\nD) Send emails\nAnswer: A\n\n2. Next question...'} style={{ width: '100%', resize: 'vertical', fontSize: '13px', lineHeight: '1.5' }} />
          </div>
          {parseError && <div style={{ fontSize: '12px', color: '#fca5a5', background: 'rgba(239,68,68,0.15)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.3)', fontWeight: 600 }}>{parseError}</div>}
          {parsedQuestions.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#4ade80' }}>✓ {parsedQuestions.length} questions detected</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                {parsedQuestions.map((q, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>{idx + 1}. {q.text}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                      {q.options.map((opt, i) => (
                        <div key={i} style={{ fontSize: '11px', padding: '5px 8px', borderRadius: '7px', background: i === q.correct ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.04)', color: i === q.correct ? '#4ade80' : '#ffffff', fontWeight: i === q.correct ? 700 : 500, border: `1px solid ${i === q.correct ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.1)'}` }}>
                          {String.fromCharCode(65+i)}. {opt} {i === q.correct && '✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleImport} style={{ background: 'linear-gradient(135deg,#0284c7,#0369a1)', border: '1px solid rgba(56,189,248,0.5)', color: '#fff', padding: '11px 22px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, boxShadow: '0 4px 16px rgba(2,132,199,0.4)', cursor: 'pointer', alignSelf: 'flex-start' }}>
                Import All {parsedQuestions.length} Questions →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
