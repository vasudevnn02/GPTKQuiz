import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LogOutIcon, TargetIcon, CalendarIcon, TrophyIcon, ClockIcon } from '../icons/SvgIcons.jsx';
import { glass, glassBtn } from '../../glass.js';
import { getSavedStudentAvatar } from '../../utils/avatarGallery.js';
import AvatarPickerModal from './AvatarPickerModal.jsx';

const TABS = [
  { id: 'live',     label: 'Exam Center',    icon: TargetIcon },
  { id: 'upcoming', label: 'Upcoming Tests', icon: CalendarIcon },
  { id: 'results',  label: 'My Results',     icon: TrophyIcon },
];

export default function StudentTopNav({ user, onLogout, activeTab, onSelectTab }) {
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(() => getSavedStudentAvatar(user?.rollNo));

  useEffect(() => {
    setAvatarUrl(getSavedStudentAvatar(user?.rollNo));
  }, [user?.rollNo]);

  // Live ticking date and clock
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayName = time.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  return (
    <header className="liqglass" style={{
      ...glass,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 24px',
      height: '66px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
    }}>
      {/* ── LEFT: Brand Logo & Student Tag ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '11px',
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '14px',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
        }}>
          G
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.3px' }}>GPTK</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.3px' }}>Quiz</span>
        </div>
        <span style={{
          fontSize: '10px',
          color: '#38bdf8',
          background: 'rgba(56, 189, 248, 0.14)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          padding: '2px 8px',
          borderRadius: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          fontWeight: 800,
        }}>
          STUDENT
        </span>
      </div>

      {/* ── CENTER: Decent Unified Tab Pill Group ── */}
      <nav style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.16)',
        borderRadius: '16px',
        padding: '3px',
        gap: '4px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                background: isActive
                  ? 'rgba(56, 189, 248, 0.22)'
                  : 'transparent',
                border: isActive
                  ? '1px solid rgba(56, 189, 248, 0.55)'
                  : '1px solid transparent',
                boxShadow: isActive
                  ? '0 2px 12px rgba(56, 189, 248, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35)'
                  : 'none',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              <Icon size={15} color={isActive ? '#38bdf8' : 'rgba(255, 255, 255, 0.65)'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── RIGHT: Live Date & Time + Student Profile + Exit ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Live Date, Day & Time Stamp Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '12px',
          padding: '6px 14px',
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.9)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          whiteSpace: 'nowrap',
        }}>
          <ClockIcon size={14} color="#38bdf8" />
          <span>{dayName}, {dateStr} • {timeStr}</span>
        </div>

        {/* Student Avatar & Roll (Click to change 50+ 2D Profile Pic) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <div style={{ textAlign: 'right', lineHeight: '1.2' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              {user?.name || 'Student'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)' }}>
              {user?.rollNo}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAvatarPicker(true)}
            title="Change 2D Profile Avatar"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              padding: '2px',
              background: 'rgba(56, 189, 248, 0.22)',
              border: '1.5px solid rgba(56, 189, 248, 0.55)',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <span style={{ fontWeight: 800, fontSize: '14px', color: '#ffffff' }}>{initial}</span>
            )}
          </button>
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
            borderRadius: '11px',
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
              Are you sure you want to end your session and log out?
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

      {/* Google-style Profile Picture Picker Modal */}
      {showAvatarPicker && (
        <AvatarPickerModal
          student={user}
          onClose={() => setShowAvatarPicker(false)}
          onAvatarSelected={(newPng) => {
            setAvatarUrl(newPng);
          }}
        />
      )}
    </header>
  );
}
