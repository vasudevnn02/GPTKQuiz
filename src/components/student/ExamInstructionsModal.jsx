import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShieldIcon, ClockIcon, AlertTriangleIcon, CheckCircleIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function ExamInstructionsModal({ quiz, onClose, onConfirmStart }) {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [agreed, setAgreed] = useState(false);

  // 10-second countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const questionsCount = Array.isArray(quiz?.questions)
    ? quiz.questions.length
    : Object.keys(quiz?.questions || {}).length;

  const handleStart = () => {
    if (secondsLeft > 0 || !agreed) return;

    // Attempt fullscreen lockdown
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}

    onConfirmStart(quiz);
  };

  const modalNode = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        background: 'rgba(2, 6, 23, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '92vh',
          background: '#0d1527',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '26px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* ── Modal Header ── */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldIcon size={22} color="#38bdf8" />
            </div>
            <div>
              <h2 style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.3px' }}>
                Examination & Anti-Cheat Rules
              </h2>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '3px' }}>
                Government Polytechnic, Kadur-197 • Proctored Assessment
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* ── Modal Body: Quiz Meta + Strict Rules ── */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Assessment Summary Chip Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '14px 18px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', fontWeight: 800 }}>
                Subject / Topic
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                {quiz?.title}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '18px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', fontWeight: 800 }}>
                  Duration
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                  {quiz?.durationMinutes || 15} Mins
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase', fontWeight: 800 }}>
                  Questions
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {questionsCount} Qs
                </div>
              </div>
            </div>
          </div>

          {/* Strict Anti-Cheat Proctoring Rules */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
              Mandatory Anti-Cheat Instructions:
            </div>

            {/* Rule 1: Tab Switch Policy */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: '14px',
              padding: '12px 16px'
            }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>🚫</span>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#ffffff' }}>
                <strong style={{ color: '#fca5a5' }}>Zero Tab-Switch Policy:</strong> You must strictly remain on the assessment page. Do NOT switch tabs, open other applications, or minimize this window.
              </div>
            </div>

            {/* Rule 2: Strike 1 Warning */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '14px',
              padding: '12px 16px'
            }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>⚠️</span>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#ffffff' }}>
                <strong style={{ color: '#fde047' }}>1st Tab Switch = Official Warning:</strong> Switching away once triggers an immediate on-screen warning alert.
              </div>
            </div>

            {/* Rule 3: Strike 2 Debarment */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: 'rgba(239, 68, 68, 0.14)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '14px',
              padding: '12px 16px'
            }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>❌</span>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#ffffff' }}>
                <strong style={{ color: '#f87171' }}>2nd Tab Switch = Immediate Debarment & FAIL:</strong> A second tab switch will instantly terminate your exam. Your score will be permanently submitted as <strong style={{ color: '#f87171' }}>0 Marks (FAIL / DEBARRED)</strong> on both Student and Teacher records.
              </div>
            </div>

            {/* Rule 4: Navigation Lockdown */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '12px 16px'
            }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>🔒</span>
              <div style={{ fontSize: '13px', lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.85)' }}>
                <strong>Fullscreen Lockdown:</strong> The test runs in fullscreen. Exiting fullscreen or attempting developer shortcut keys (F12, Ctrl+C, Ctrl+V) is logged as an integrity violation.
              </div>
            </div>
          </div>

          {/* 10-Second Countdown Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '12px',
            background: secondsLeft > 0 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(34, 197, 94, 0.14)',
            border: `1px solid ${secondsLeft > 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(34, 197, 94, 0.4)'}`,
            fontSize: '13px',
            fontWeight: 700,
            color: secondsLeft > 0 ? '#38bdf8' : '#4ade80'
          }}>
            {secondsLeft > 0 ? (
              <>
                <ClockIcon size={16} color="#38bdf8" />
                <span>Please read instructions carefully: <strong>{secondsLeft}s</strong> remaining before test can start...</span>
              </>
            ) : (
              <>
                <CheckCircleIcon size={16} color="#4ade80" />
                <span>✓ Mandatory reading time completed. You may now agree and start.</span>
              </>
            )}
          </div>

          {/* Checkbox: I Have Read and Agree */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            borderRadius: '14px',
            background: agreed ? 'rgba(56, 189, 248, 0.14)' : 'rgba(255, 255, 255, 0.04)',
            border: `1px solid ${agreed ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.14)'}`,
            cursor: secondsLeft === 0 ? 'pointer' : 'not-allowed',
            opacity: secondsLeft === 0 ? 1 : 0.6,
            transition: 'all 0.18s ease'
          }}>
            <input
              type="checkbox"
              checked={agreed}
              disabled={secondsLeft > 0}
              onChange={e => setAgreed(e.target.checked)}
              style={{
                width: '18px',
                height: '18px',
                accentColor: '#0ea5e9',
                cursor: secondsLeft === 0 ? 'pointer' : 'not-allowed'
              }}
            />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', lineHeight: '1.45' }}>
              I have read, understood, and agree to follow all examination rules. I understand that switching tabs 2 times will immediately debar and fail me.
            </span>
          </label>
        </div>

        {/* ── Modal Footer ── */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px',
          background: 'rgba(2, 6, 23, 0.5)'
        }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              color: '#ffffff',
              padding: '10px 22px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleStart}
            disabled={secondsLeft > 0 || !agreed}
            style={{
              background: secondsLeft === 0 && agreed
                ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              border: secondsLeft === 0 && agreed
                ? '1px solid #38bdf8'
                : '1px solid rgba(255, 255, 255, 0.15)',
              color: secondsLeft === 0 && agreed ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
              padding: '11px 26px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 800,
              cursor: secondsLeft === 0 && agreed ? 'pointer' : 'not-allowed',
              boxShadow: secondsLeft === 0 && agreed ? '0 4px 18px rgba(2, 132, 199, 0.4)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            {secondsLeft > 0 ? `Read Rules (${secondsLeft}s)` : 'Start Assessment →'}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
}
