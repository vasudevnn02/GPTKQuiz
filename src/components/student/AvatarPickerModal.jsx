import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  AVATAR_CATEGORIES,
  AVATAR_DEFINITIONS,
  getAvatarById,
  saveStudentAvatar
} from '../../utils/avatarGallery.js';
import AvatarBubble from './AvatarBubble.jsx';
import { XIcon, SearchIcon, SparklesIcon, CheckIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function AvatarPickerModal({ student, onClose, onAvatarSelected }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const savedId = localStorage.getItem(`gptk_avatar_${student?.rollNo || 'student'}`);
  const [selectedId, setSelectedId] = useState(savedId || 'german_shepherd');

  const filteredAvatars = useMemo(() => {
    const q = search.trim().toLowerCase();
    return AVATAR_DEFINITIONS.filter(a => {
      const matchCat = activeCategory === 'all' || a.category === activeCategory;
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.shortName.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const selectedAvatar = useMemo(() => {
    return getAvatarById(selectedId);
  }, [selectedId]);

  const handleSelect = (avatar) => {
    setSelectedId(avatar.id);
    saveStudentAvatar(student?.rollNo, avatar.id);
    if (onAvatarSelected) onAvatarSelected(avatar.id);
  };

  const modalNode = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: 'rgba(2, 6, 23, 0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        .avatar-scroll-hide {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .avatar-scroll-hide::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .avatar-grid-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
        }
        .avatar-grid-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .avatar-grid-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.22);
          border-radius: 999px;
        }
        .avatar-card-hover {
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .avatar-card-hover:hover {
          transform: translateY(-3px);
        }
      `}</style>

      <div
        className="liqglass-deep"
        onClick={e => e.stopPropagation()}
        style={{
          ...glassDeep,
          maxWidth: '740px',
          width: '100%',
          maxHeight: '88vh',
          borderRadius: '26px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          margin: 'auto',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)'
        }}
      >
        {/* ── Modal Header ── */}
        <div style={{
          padding: '20px 24px 16px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.01em' }}>
                Choose Profile Picture
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', margin: '3px 0 0 0' }}>
              Select from 63 official 2D illustrated profile avatars
            </p>
          </div>

          {/* Quick Search */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '220px',
            width: '100%'
          }}>
            <div style={{ position: 'absolute', left: '10px', pointerEvents: 'none', display: 'flex' }}>
              <SearchIcon size={14} color="rgba(255, 255, 255, 0.45)" />
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search avatars..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '12px',
                padding: '7px 12px 7px 30px',
                fontSize: '12px',
                color: '#ffffff',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={e => (e.target.style.borderColor = '#38bdf8')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.14)')}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              ...glassBtn,
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0
            }}
          >
            <XIcon size={14} color="#ffffff" />
          </button>
        </div>

        {/* ── Categories Bar (Scrollbar completely hidden) ── */}
        <div
          className="avatar-scroll-hide"
          style={{
            padding: '10px 20px',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            overflowY: 'hidden',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(255, 255, 255, 0.02)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {AVATAR_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#0f172a' : 'rgba(255, 255, 255, 0.8)',
                  background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.06)',
                  border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.12)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  flexShrink: 0
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── 2D Avatar Grid ── */}
        <div
          className="avatar-grid-scroll"
          style={{
            padding: '20px 24px',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
            gap: '16px 12px',
            alignContent: 'start',
            flex: 1,
            minHeight: '340px'
          }}
        >
          {filteredAvatars.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '48px 16px',
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              <p style={{ fontSize: '14px', margin: '0 0 6px 0' }}>No avatars matched "{search}"</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                style={{
                  ...glassBtn,
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: '#38bdf8'
                }}
              >
                View all 63 avatars
              </button>
            </div>
          ) : (
            filteredAvatars.map(avatar => {
              const isSelected = selectedId === avatar.id;
              return (
                <div
                  key={avatar.id}
                  className="avatar-card-hover"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                  }}
                >
                  <AvatarBubble
                    avatar={avatar}
                    size={62}
                    isSelected={isSelected}
                    onClick={() => handleSelect(avatar)}
                    showLabel={true}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* ── Modal Footer ── */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(2, 6, 23, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Active Preview */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {selectedAvatar && (
              <>
                <AvatarBubble avatar={selectedAvatar} size={36} interactive={false} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    {selectedAvatar.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckIcon size={12} color="#10b981" />
                    Saved to profile
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              background: '#0ea5e9',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
              flexShrink: 0
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0284c7')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0ea5e9')}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalNode, document.body);
}
