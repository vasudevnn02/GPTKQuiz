import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LogOutIcon, CalendarIcon, UserIcon } from '../icons/SvgIcons.jsx';
import { glass, glassBtn } from '../../glass.js';

export default function TeacherTopNav({ admin, activeTab, onSelectTab, onLogout }) {
  const [time, setTime] = useState(() => new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayStr = time.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <header className="liqglass" style={{
      ...glass,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      height: '66px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      animation: 'none',
    }}>
      {/* 1. Left: Brand Logo & Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '11px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#ffffff', fontWeight: 800, fontSize: '14px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)'
        }}>
          G
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span style={{ fontSize: '19px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK</span>
          <span style={{ fontSize: '19px', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.3px' }}>Quiz</span>
        </div>
      </div>

      {/* 2. Center: Live Date, Day & Time Stamp Badge */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '12px',
        padding: '7px 16px',
        fontSize: '12px',
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
      }}>
        <CalendarIcon size={14} color="#38bdf8" />
        <span>{dayStr}, {dateStr} • {timeStr}</span>
      </div>

      {/* 3. Right: Lecturer / Faculty Tag & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '12px',
          padding: '7px 14px',
          fontSize: '12px',
          fontWeight: 700,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
        }}>
          <UserIcon size={14} color="#38bdf8" />
          <span>Lecturer: {admin?.name || 'Faculty Administrator'}</span>
        </div>

        {/* Logout Button (SVG only by default, expands to show 'Logout' on hover, triggers confirmation modal) */}
        <button
          onClick={() => setShowLogoutModal(true)}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
          title="Logout"
          style={{
            ...glassBtn,
            padding: isLogoutHovered ? '7px 14px' : '7px 10px',
            borderRadius: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: isLogoutHovered ? '6px' : '0px',
            fontSize: '12px',
            fontWeight: 700,
            background: isLogoutHovered ? 'rgba(239, 68, 68, 0.16)' : 'rgba(255, 255, 255, 0.06)',
            borderColor: isLogoutHovered ? 'rgba(239, 68, 68, 0.45)' : 'rgba(255, 255, 255, 0.18)',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <LogOutIcon size={14} color={isLogoutHovered ? '#fca5a5' : 'rgba(255, 255, 255, 0.9)'} />
          <span style={{
            maxWidth: isLogoutHovered ? '60px' : '0px',
            opacity: isLogoutHovered ? 1 : 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            color: isLogoutHovered ? '#fca5a5' : '#ffffff'
          }}>
            Logout
          </span>
        </button>
      </div>

      {/* Logout Confirmation Modal via Portal */}
      {showLogoutModal && typeof document !== 'undefined' && createPortal(
        <div
          onClick={() => setShowLogoutModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999999,
            background: 'rgba(0, 3, 10, 0.75)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div
            className="liqglass-deep"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '380px',
              width: '100%',
              borderRadius: '24px',
              padding: '28px 24px',
              textAlign: 'center',
              margin: 'auto',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: 'none',
            }}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <LogOutIcon size={20} color="#f87171" />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
              Confirm Logout
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.5', marginBottom: '22px' }}>
              Are you sure you want to end your teacher session and log out?
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
                style={{
                  padding: '9px 22px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  border: '1px solid rgba(248, 113, 113, 0.5)',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
