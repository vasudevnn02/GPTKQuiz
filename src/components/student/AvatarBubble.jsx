import React, { useState } from 'react';
import { getAvatarTwemojiUrl, getAvatarById } from '../../utils/avatarGallery.js';
import { CheckIcon } from '../icons/SvgIcons.jsx';

/**
 * Modern 2D Illustrated Avatar Bubble
 * Features:
 * - Duotone vibrant linear gradient background
 * - Official Twemoji 2D vector illustration (sharp, crisp, colorful)
 * - Safe native emoji fallback if offline
 * - Apple-style concentric border ring with depth shadow
 * - Selected indicator badge with checkmark
 */
export default function AvatarBubble({
  avatar,
  avatarId,
  size = 54,
  isSelected = false,
  onClick,
  showLabel = false,
  interactive = true,
  style = {}
}) {
  const [imageError, setImageError] = useState(false);
  const def = avatar || getAvatarById(avatarId);
  if (!def) return null;

  const [c1, c2] = def.colors || ['#38bdf8', '#0284c7'];
  const twemojiSrc = getAvatarTwemojiUrl(def);
  const iconSize = Math.round(size * 0.58);

  const bubble = (
    <div
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxSizing: 'border-box',
        border: isSelected ? '2.5px solid #38bdf8' : '1.5px solid rgba(255, 255, 255, 0.28)',
        boxShadow: isSelected
          ? '0 0 0 3px rgba(56, 189, 248, 0.4), 0 8px 18px rgba(0, 0, 0, 0.4)'
          : '0 4px 12px rgba(0, 0, 0, 0.25)',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isSelected ? 'scale(1.04)' : 'scale(1)',
        flexShrink: 0,
        ...style
      }}
    >
      {!imageError && twemojiSrc ? (
        <img
          src={twemojiSrc}
          alt={def.name}
          loading="lazy"
          onError={() => setImageError(true)}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.28))'
          }}
        />
      ) : (
        <span
          style={{
            fontSize: `${Math.round(size * 0.5)}px`,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))'
          }}
        >
          {def.symbol}
        </span>
      )}

      {/* Selected Checkmark Badge */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            width: `${Math.max(16, Math.round(size * 0.32))}px`,
            height: `${Math.max(16, Math.round(size * 0.32))}px`,
            borderRadius: '50%',
            background: '#38bdf8',
            color: '#020617',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #020617',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)'
          }}
        >
          <CheckIcon size={Math.round(size * 0.2)} color="#020617" />
        </div>
      )}
    </div>
  );

  if (!showLabel) return bubble;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: interactive ? 'pointer' : 'default',
        width: `${size + 16}px`,
        maxWidth: `${size + 16}px`
      }}
    >
      {bubble}
      <span
        style={{
          fontSize: '11px',
          fontWeight: isSelected ? 700 : 500,
          color: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.85)',
          textAlign: 'center',
          lineHeight: '1.25',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          wordBreak: 'break-word',
          height: '28px'
        }}
      >
        {def.shortName}
      </span>
    </div>
  );
}
