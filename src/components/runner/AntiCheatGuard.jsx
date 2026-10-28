import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShieldIcon, AlertTriangleIcon } from '../icons/SvgIcons.jsx';

export default function AntiCheatGuard({ onViolation, onDebar, violations = 0 }) {
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showDebarModal, setShowDebarModal] = useState(false);

  const strikeCountRef = useRef(violations || 0);
  const lastEventTimeRef = useRef(0);
  const isDebarredRef = useRef(false);

  // Sync violations prop if updated externally
  useEffect(() => {
    strikeCountRef.current = Math.max(strikeCountRef.current, violations || 0);
  }, [violations]);

  // Tab switch handler with debounce to avoid firing multiple times in 1 switch
  const handleTabSwitchOrBlur = (reasonText) => {
    if (isDebarredRef.current) return;

    const now = Date.now();
    if (now - lastEventTimeRef.current < 1600) return;
    lastEventTimeRef.current = now;

    strikeCountRef.current += 1;
    const currentStrike = strikeCountRef.current;

    if (currentStrike === 1) {
      // ── Strike 1: Show prominent Warning Alert ──
      setShowWarningModal(true);
      if (onViolation) {
        onViolation(`Tab switch detected (Warning 1 of 1) - ${reasonText}`);
      }
    } else if (currentStrike >= 2) {
      // ── Strike 2: Debar / Disqualify / Fail ──
      isDebarredRef.current = true;
      setShowWarningModal(false);
      setShowDebarModal(true);
      if (onDebar) {
        onDebar('Debarred: Tab Switch Violation');
      }
    }
  };

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && ['c', 'v', 'u', 's', 'p'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        if (onViolation) onViolation('Disallowed key combination detected');
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        handleTabSwitchOrBlur('Navigated away from examination tab');
      }
    };

    const handleWindowBlur = () => {
      handleTabSwitchOrBlur('Browser window lost focus');
    };

    const handleFullscreen = () => {
      if (!document.fullscreenElement && !isDebarredRef.current) {
        if (onViolation) onViolation('Exited mandatory full-screen mode');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreen);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreen);
    };
  }, [onViolation, onDebar]);

  const requestFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <>
      {/* ── Top Bar Proctoring Indicator ── */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: 'rgba(255, 255, 255, 0.7)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldIcon size={14} color="#38bdf8" />
          <span>
            GPTK Proctor Integrity Monitor Active • Zero Tab-Switch Policy Enforced
            {strikeCountRef.current > 0 && (
              <strong style={{ color: '#f59e0b', marginLeft: '6px' }}>
                ({strikeCountRef.current}/2 Strikes)
              </strong>
            )}
          </span>
        </div>
        <button
          onClick={requestFullscreen}
          style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            color: '#38bdf8',
            padding: '4px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Lock Fullscreen
        </button>
      </div>

      {/* ── STRIKE 1: WARNING MODAL (Appears on first tab switch) ── */}
      {showWarningModal && !showDebarModal && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999999,
            background: 'rgba(2, 6, 23, 0.94)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#0d1527',
              border: '2px solid rgba(245, 158, 11, 0.7)',
              borderRadius: '24px',
              padding: '32px 28px',
              textAlign: 'center',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.25)'
            }}
          >
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'rgba(245, 158, 11, 0.16)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '30px'
            }}>
              ⚠️
            </div>

            <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#fde047', marginBottom: '8px' }}>
              Warning: Tab Switch Detected!
            </h2>

            <div style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#f59e0b',
              background: 'rgba(245, 158, 11, 0.16)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              padding: '4px 14px',
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '18px',
              letterSpacing: '0.4px',
              textTransform: 'uppercase'
            }}>
              STRIKE 1 OF 2 — FINAL WARNING
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', marginBottom: '22px' }}>
              You navigated away from or minimized the active examination window. If you switch tabs, minimize, or navigate away <strong>ONE MORE TIME</strong>, you will be <strong>IMMEDIATELY DEBARRED</strong> and your assessment will be submitted as <strong style={{ color: '#f87171' }}>FAIL (0 Marks)</strong>.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowWarningModal(false);
                requestFullscreen();
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                border: '1px solid #f59e0b',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(217, 119, 6, 0.35)'
              }}
            >
              I Understand — Return to Assessment
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* ── STRIKE 2: DEBARRED DISQUALIFICATION MODAL (Appears on second tab switch) ── */}
      {showDebarModal && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999999,
            background: 'rgba(15, 2, 2, 0.96)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#1a0808',
              border: '2px solid rgba(239, 68, 68, 0.75)',
              borderRadius: '24px',
              padding: '36px 28px',
              textAlign: 'center',
              boxShadow: '0 24px 64px rgba(220, 38, 38, 0.35)'
            }}
          >
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '22px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: '32px'
            }}>
              ❌
            </div>

            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f87171', marginBottom: '8px' }}>
              Examination Debarred &amp; Terminated
            </h2>

            <div style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.16)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              padding: '4px 14px',
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '18px',
              letterSpacing: '0.4px',
              textTransform: 'uppercase'
            }}>
              DISQUALIFIED — MULTIPLE TAB SWITCH VIOLATIONS
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', marginBottom: '24px' }}>
              You switched tabs for a second time after receiving your initial warning. In accordance with anti-cheat regulations, your examination has been <strong>TERMINATED</strong> and permanently recorded as <strong style={{ color: '#f87171' }}>FAILED (0 Marks)</strong> on both Student and Teacher records.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowDebarModal(false);
                if (window.location) window.location.reload();
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                border: '1px solid #ef4444',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(220, 38, 38, 0.4)'
              }}
            >
              Exit to Student Portal
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
