import React from 'react';

/**
 * iOS 26 / SF Symbols Aesthetic Icon Suite
 * Characterized by Apple's continuous optical curves, squircle geometry,
 * balanced stroke weights, and precision rounded endpoints.
 */
const Svg = ({ size = 20, color = 'rgba(255, 255, 255, 0.95)', fill = 'none', children, strokeWidth = '1.9' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    {children}
  </svg>
);

// ── Clock (SF Symbol: clock.fill / clock) ──
export const ClockIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <polyline points="12 6.8 12 12 15.5 14" strokeWidth="2" />
    <circle cx="12" cy="12" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
  </Svg>
);

// ── Play (SF Symbol: play.fill) ──
export const PlayIcon = ({ size = 20, color = '#ffffff' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M7.8 4.8c0-1.1 1.2-1.8 2.2-1.2l10.4 6.2c1 .6 1 2 0 2.6L10 18.6c-1 .6-2.2-.1-2.2-1.2V4.8z" />
  </svg>
);

// ── Lock (SF Symbol: lock.fill / lock) ──
export const LockIcon = (p) => (
  <Svg {...p}>
    <rect x="4.5" y="10.5" width="15" height="10.5" rx="3.5" ry="3.5" />
    <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
    <circle cx="12" cy="15" r="1.3" fill={p.color || 'currentColor'} stroke="none" />
    <line x1="12" y1="16.3" x2="12" y2="18.2" strokeWidth="2" />
  </Svg>
);

// ── Check (SF Symbol: checkmark) ──
export const CheckIcon = (p) => (
  <Svg {...p} strokeWidth="2.4">
    <path d="M4.5 12.5l5 5L19.5 6.5" />
  </Svg>
);

// ── Check Circle (SF Symbol: checkmark.circle.fill) ──
export const CheckCircleIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <path d="M8 12.2l3 3 5.5-5.5" strokeWidth="2.2" />
  </Svg>
);

// ── Alert Triangle (SF Symbol: exclamationmark.triangle) ──
export const AlertTriangleIcon = (p) => (
  <Svg {...p}>
    <path d="M10.2 3.8a2 2 0 0 1 3.6 0l8.1 14.5c.8 1.4-.2 3.2-1.8 3.2H3.9c-1.6 0-2.6-1.8-1.8-3.2L10.2 3.8z" />
    <line x1="12" y1="9.2" x2="12" y2="13.8" strokeWidth="2.2" />
    <circle cx="12" cy="17.2" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
  </Svg>
);

// ── Person / User (SF Symbol: person.crop.circle / person) ──
export const UserIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="7.8" r="4.2" />
    <path d="M4.5 19.5c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" />
  </Svg>
);

// ── Student / ID Card (SF Symbol: person.text.rectangle / idcard) ──
export const IdCardIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="3" ry="3" />
    <circle cx="8" cy="10" r="2" />
    <line x1="13" y1="9" x2="17.5" y2="9" strokeWidth="2" />
    <line x1="13" y1="12.5" x2="16.5" y2="12.5" strokeWidth="2" />
    <line x1="6.5" y1="15.8" x2="17.5" y2="15.8" strokeWidth="2" />
  </Svg>
);

// ── Logout (SF Symbol: rectangle.portrait.and.arrow.right) ──
export const LogOutIcon = (p) => (
  <Svg {...p}>
    <path d="M9 20.5H6.5A2.5 2.5 0 0 1 4 18V6a2.5 2.5 0 0 1 2.5-2.5H9" />
    <path d="M15.5 16.5l4.5-4.5-4.5-4.5" strokeWidth="2" />
    <line x1="20" y1="12" x2="9" y2="12" strokeWidth="2" />
  </Svg>
);

// ── Shield (SF Symbol: shield) ──
export const ShieldIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2.5s-7 1.8-7 6.5c0 6.5 5 10.8 7 12 2-1.2 7-5.5 7-12 0-4.7-7-6.5-7-6.5z" />
  </Svg>
);

// ── Search (SF Symbol: magnifyingglass) ──
export const SearchIcon = (p) => (
  <Svg {...p}>
    <circle cx="10.8" cy="10.8" r="6.8" />
    <line x1="15.8" y1="15.8" x2="20.5" y2="20.5" strokeWidth="2.4" />
  </Svg>
);

// ── Award / Medal (SF Symbol: medal / rosette) ──
export const AwardIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8.5" r="5.5" />
    <path d="M8.2 13.5L6.5 21l5.5-2.5 5.5 2.5-1.7-7.5" />
  </Svg>
);

// ── Book (SF Symbol: book.closed / book) ──
export const BookOpenIcon = (p) => (
  <Svg {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5H6.5A2.5 2.5 0 0 0 4 19.5z" />
    <line x1="8" y1="8" x2="15" y2="8" />
    <line x1="8" y1="12" x2="13" y2="12" />
  </Svg>
);

// ── Chevron Down (SF Symbol: chevron.down) ──
export const ChevronDownIcon = (p) => (
  <Svg {...p} strokeWidth="2.4">
    <path d="M6 9.5l6 5.5 6-5.5" />
  </Svg>
);

// ── Chevron Right (SF Symbol: chevron.right) ──
export const ChevronRightIcon = (p) => (
  <Svg {...p} strokeWidth="2.4">
    <path d="M9.5 6l5.5 6-5.5 6" />
  </Svg>
);

// ── Plus (SF Symbol: plus) ──
export const PlusIcon = (p) => (
  <Svg {...p} strokeWidth="2.4">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);

// ── Trash (SF Symbol: trash) ──
export const TrashIcon = (p) => (
  <Svg {...p}>
    <path d="M3.5 6.5h17" />
    <path d="M8.5 6.5V4.5a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 1 1.5 1.5v2" />
    <path d="M18 6.5l-1 13a2.5 2.5 0 0 1-2.5 2.5H9.5A2.5 2.5 0 0 1 7 19.5l-1-13" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </Svg>
);

// ── Edit (SF Symbol: square.and.pencil) ──
export const EditIcon = (p) => (
  <Svg {...p}>
    <path d="M12 4H5.5A2.5 2.5 0 0 0 3 6.5v12A2.5 2.5 0 0 0 5.5 21h12a2.5 2.5 0 0 0 2.5-2.5V12" />
    <path d="M18.8 3.2a1.8 1.8 0 0 1 2.5 2.5L11 16l-3.5 1 1-3.5 10.3-10.3z" />
  </Svg>
);

// ── Package / Box (SF Symbol: shippingbox) ──
export const PackageIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1l8-4.6z" />
    <polyline points="4 7.1 12 11.7 20 7.1" />
    <line x1="12" y1="11.7" x2="12" y2="21.5" />
    <line x1="7.5" y1="4.9" x2="15.5" y2="9.5" />
  </Svg>
);

// ── Calendar (SF Symbol: calendar) ──
export const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="4.5" width="17" height="16" rx="3.5" ry="3.5" />
    <line x1="16" y1="2.5" x2="16" y2="6.5" strokeWidth="2.2" />
    <line x1="8" y1="2.5" x2="8" y2="6.5" strokeWidth="2.2" />
    <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
    <circle cx="8" cy="13.5" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
    <circle cx="12" cy="13.5" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
    <circle cx="16" cy="13.5" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
    <circle cx="8" cy="17" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
    <circle cx="12" cy="17" r="1.1" fill={p.color || 'currentColor'} stroke="none" />
  </Svg>
);

// ── Sparkles (SF Symbol: sparkles - Apple Intelligence) ──
export const SparkleIcon = ({ size = 20, color = '#ffffff' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M12 2.5c0 4.2 3.3 7.5 7.5 7.5-4.2 0-7.5 3.3-7.5 7.5 0-4.2-3.3-7.5-7.5-7.5 4.2 0 7.5-3.3 7.5-7.5z" />
    <path d="M19.5 16.5c0 1.8 1.4 3.2 3.2 3.2-1.8 0-3.2 1.4-3.2 3.2 0-1.8-1.4-3.2-3.2-3.2 1.8 0 3.2-1.4 3.2-3.2z" />
    <path d="M4.5 4.5c0 1.4 1.1 2.5 2.5 2.5-1.4 0-2.5 1.1-2.5 2.5 0-1.4-1.1-2.5-2.5-2.5 1.4 0 2.5-1.1 2.5-2.5z" />
  </svg>
);
export const SparklesIcon = SparkleIcon;

// ── Close / X (SF Symbol: xmark) ──
export const XIcon = (p) => (
  <Svg {...p} strokeWidth="2.4">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);

// ── Target / Scope (SF Symbol: scope) ──
export const TargetIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9.2" />
    <circle cx="12" cy="12" r="4.6" />
    <circle cx="12" cy="12" r="1.6" fill={p.color || 'currentColor'} stroke="none" />
  </Svg>
);

// ── Trophy (SF Symbol: trophy) ──
export const TrophyIcon = (p) => (
  <Svg {...p}>
    <path d="M6.5 4h11v5a5.5 5.5 0 0 1-11 0V4z" />
    <path d="M6.5 6H4a2 2 0 0 0-2 2c0 2.5 2 4.5 4.5 4.5" />
    <path d="M17.5 6H20a2 2 0 0 1 2 2c0 2.5-2 4.5-4.5 4.5" />
    <path d="M12 14.5V18" strokeWidth="2.2" />
    <path d="M7.5 21h9" strokeWidth="2.2" />
  </Svg>
);

// ── Radio Waves (SF Symbol: antenna.radiowaves.left.and.right) ──
export const RadioIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2" fill={p.color || 'currentColor'} stroke="none" />
    <path d="M16.5 7.5a6.5 6.5 0 0 1 0 9" />
    <path d="M7.5 16.5a6.5 6.5 0 0 1 0-9" />
    <path d="M19.5 4.5a11 11 0 0 1 0 15" />
    <path d="M4.5 19.5a11 11 0 0 1 0-15" />
  </Svg>
);

// ── Message (SF Symbol: message) ──
export const MessageIcon = (p) => (
  <Svg {...p}>
    <path d="M20.5 12c0 4.4-4 8-9 8-1.4 0-2.8-.3-4-.8L3.5 20.5l1.5-3.8C4.3 15.4 3.5 13.8 3.5 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
  </Svg>
);

// ── Copy (SF Symbol: doc.on.doc) ──
export const CopyIcon = (p) => (
  <Svg {...p}>
    <rect x="8.5" y="8.5" width="11.5" height="12" rx="2.5" ry="2.5" />
    <path d="M5 15.5V5.5A2.5 2.5 0 0 1 7.5 3h9" />
  </Svg>
);

// ── List (SF Symbol: list.bullet) ──
export const ListIcon = (p) => (
  <Svg {...p}>
    <circle cx="5" cy="7" r="1.3" fill={p.color || 'currentColor'} stroke="none" />
    <line x1="9.5" y1="7" x2="20" y2="7" strokeWidth="2.1" />
    <circle cx="5" cy="12" r="1.3" fill={p.color || 'currentColor'} stroke="none" />
    <line x1="9.5" y1="12" x2="20" y2="12" strokeWidth="2.1" />
    <circle cx="5" cy="17" r="1.3" fill={p.color || 'currentColor'} stroke="none" />
    <line x1="9.5" y1="17" x2="20" y2="17" strokeWidth="2.1" />
  </Svg>
);
