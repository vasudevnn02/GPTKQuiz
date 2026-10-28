import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  AVATAR_CATEGORIES,
  AVATAR_DEFINITIONS,
  getAvatar2DPng,
  saveStudentAvatar
} from '../../utils/avatarGallery.js';
import { CheckIcon, XIcon } from '../icons/SvgIcons.jsx';
import { glassDeep, glassBtn } from '../../glass.js';

export default function AvatarPickerModal({ student, onClose, onAvatarSelected }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const savedId = localStorage.getItem(`gptk_avatar_${student?.rollNo || 'student'}`);
  const [selectedId, setSelectedId] = useState(savedId || 'ind_tiger');

  const filteredAvatars = useMemo(() => {
    return AVATAR_DEFINITIONS.filter(a => {
      const matchCat = activeCategory === 'all' || a.category === activeCategory;
      const matchSearch = !search.trim() || a.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const handleSelect = (avatar) => {
    setSelectedId(avatar.id);
    saveStudentAvatar(student?.rollNo, avatar.id);
    const png = getAvatar2DPng(avatar);
    if (onAvatarSelected) onAvatarSelected(png);
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
        background: 'rgba(2, 6, 23, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="liqglass-deep"
        onClick={e => e.stopPropagation()}
        style={{
          ...glassDeep,
          maxWidth: '680px',
          width: '100%',
          maxHeight: '84vh',
          borderRadius: '26px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          margin: 'auto',
          boxShadow: '0 28px 72px rgba(0, 0, 0, 0.7), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.65)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Choose Profile Picture
            </h3>
            <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', margin: '2px 0 0 0' }}>
              Select from 50+ 2D illustrated heritage, cute animals, places & things
            </p>
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
              padding: 0
            }}
          >
            <XIcon size={14} color="#ffffff" />
          </button>
        </div>

        {/* Categories Bar */}
        <div style={{
          padding: '12px 20px',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          {AVATAR_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  background: isActive ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.55)' : '1px solid rgba(255, 255, 255, 0.12)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 2D Avatar Grid */}
        <div style={{
          padding: '20px 24px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(76px, 1fr))',
          gap: '14px',
          flex: 1
        }}>
          {filteredAvatars.map(avatar => {
            const isSelected = selectedId === avatar.id;
            const pngUrl = getAvatar2DPng(avatar);

            return (
              <button
                key={avatar.id}
                onClick={() => handleSelect(avatar)}
                title={avatar.name}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                  outline: 'none',
                  transition: 'transform 0.18s ease'
                }}
              >
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  padding: '2px',
                  border: isSelected ? '2.5px solid #38bdf8' : '1.5px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: isSelected ? '0 0 16px rgba(56, 189, 248, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.18s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {pngUrl && (
                    <img
                      src={pngUrl}
                      alt={avatar.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'block',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(56, 189, 248, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: '#38bdf8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CheckIcon size={12} color="#000" />
                      </div>
                    </div>
                  )}
                </div>
                <span style={{
                  fontSize: '10px',
                  color: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: isSelected ? 800 : 500,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '72px'
                }}>
                  {avatar.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <span style={{ fontSize: '12px', color: '#4ade80', fontWeight: 700 }}>
            ✓ Selected profile picture saved
          </span>
          <button
            onClick={onClose}
            style={{
              ...glassBtn,
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              border: '1px solid rgba(56, 189, 248, 0.6)',
              padding: '8px 22px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 800
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
}
