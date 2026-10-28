import React, { useState, useEffect } from 'react';
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

        {/* Exit Button */}
        <button
          onClick={onLogout}
          style={{
            ...glassBtn,
            padding: '7px 14px',
            borderRadius: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          <LogOutIcon size={13} color="rgba(255, 255, 255, 0.95)" />
          <span>Exit</span>
        </button>
      </div>

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
