import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../services/firebase.js';
import { glassDeep, glassBtn } from '../../glass.js';

export default function AiQuestionImporter({ currentQuiz, answerKeys = {}, onClose, onImported, onImportQuestions, embedded = false }) {
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

    if (onImportQuestions) {
      onImportQuestions(parsedQuestions);
      if (onClose) onClose();
      return;
    }

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

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Step Indicator */}
      <div style={{
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '4px',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        gap: '4px'
      }}>
        <button
          type="button"
          onClick={() => setStep('prompt')}
          style={{
            flex: 1,
            padding: '9px 14px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: step === 'prompt' ? 800 : 600,
            background: step === 'prompt'
              ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
              : 'transparent',
            color: step === 'prompt' ? '#ffffff' : 'rgba(255,255,255,0.7)',
            border: step === 'prompt' ? '1px solid rgba(56,189,248,0.55)' : '1px solid transparent',
            boxShadow: step === 'prompt' ? '0 2px 10px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
            transition: 'all 0.18s ease'
          }}
        >
          1. Build &amp; Copy Prompt
        </button>
        <button
          type="button"
          onClick={() => setStep('paste')}
          style={{
            flex: 1,
            padding: '9px 14px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: step === 'paste' ? 800 : 600,
            background: step === 'paste'
              ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
              : 'transparent',
            color: step === 'paste' ? '#ffffff' : 'rgba(255,255,255,0.7)',
            border: step === 'paste' ? '1px solid rgba(56,189,248,0.55)' : '1px solid transparent',
            boxShadow: step === 'paste' ? '0 2px 10px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.3)' : 'none',
            transition: 'all 0.18s ease'
          }}
        >
          2. Paste &amp; Import
        </button>
      </div>

      {/* ── STEP 1: PROMPT BUILDER ── */}
      {step === 'prompt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Assessment Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. Python Functions, Cloud Architecture, DBMS"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '14px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '13px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              How Many Questions?
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[3, 5, 10, 15, 20].map(cnt => {
                const isSelected = questionCount === cnt;
                return (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 800,
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(2,132,199,0.35) 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isSelected
                        ? '1px solid rgba(56,189,248,0.6)'
                        : '1px solid rgba(255, 255, 255, 0.16)',
                      color: '#ffffff',
                      boxShadow: isSelected ? '0 2px 10px rgba(56,189,248,0.25)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cnt} Questions
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Generated Prompt
            </label>
            <pre style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '14px',
              padding: '14px',
              fontSize: '11px',
              color: '#ffffff',
              whiteSpace: 'pre-wrap',
              maxHeight: '160px',
              overflowY: 'auto',
              lineHeight: '1.5'
            }}>
              {generatedPrompt}
            </pre>
          </div>

          <button
            type="button"
            onClick={handleCopyAndProceed}
            style={{
              ...glassBtn,
              padding: '12px 24px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy Prompt & Go to Paste Box'}
          </button>
        </div>
      )}

      {/* ── STEP 2: PASTE & IMPORT ── */}
      {step === 'paste' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              Paste AI Output (formatted 1. Question... A) ... B) ... Answer: A)
            </label>
            <textarea
              rows={7}
              value={pastedText}
              onChange={e => {
                setPastedText(e.target.value);
                parsePastedContent(e.target.value);
              }}
              placeholder={`1. What is the main purpose of an OS?\nA) Manage hardware\nB) Design UI\nC) Create docs\nD) Send emails\nAnswer: A\n\n2. Next question...`}
              style={{
                width: '100%',
                resize: 'vertical',
                fontSize: '13px',
                lineHeight: '1.5',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '14px',
                padding: '12px 14px',
                color: '#ffffff'
              }}
            />
          </div>

          {parseError && (
            <div style={{
              fontSize: '12px',
              color: '#f87171',
              background: 'rgba(239, 68, 68, 0.15)',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              fontWeight: 600
            }}>
              {parseError}
            </div>
          )}

          {parsedQuestions.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✓</span>
                <span>{parsedQuestions.length} Questions Successfully Detected:</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
                {parsedQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '14px',
                      padding: '12px 16px',
                      border: '1px solid rgba(255, 255, 255, 0.14)'
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                      {idx + 1}. {q.text}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {q.options.map((opt, i) => {
                        const isCorrect = i === q.correct;
                        return (
                          <div
                            key={i}
                            style={{
                              fontSize: '11px',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: isCorrect ? 'rgba(34, 197, 94, 0.16)' : 'rgba(255, 255, 255, 0.04)',
                              color: isCorrect ? '#4ade80' : 'rgba(255, 255, 255, 0.9)',
                              fontWeight: isCorrect ? 800 : 500,
                              border: `1px solid ${isCorrect ? 'rgba(34, 197, 94, 0.4)' : 'rgba(255, 255, 255, 0.12)'}`
                            }}
                          >
                            {String.fromCharCode(65 + i)}. {opt} {isCorrect && '✓'}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleImport}
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.6)',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  marginTop: '4px'
                }}
              >
                Import All {parsedQuestions.length} Questions →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(2, 6, 23, 0.58)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '720px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        ...glassDeep,
        borderRadius: '26px',
        padding: '32px',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✦</span> AI Prompt &amp; Question Importer
            </h3>
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '3px' }}>
              {currentQuiz?.title || 'Examination Set'}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ ...glassBtn, padding: '8px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}
          >
            ✕ Close
          </button>
        </div>
        {content}
      </div>
    </div>
  );
}
