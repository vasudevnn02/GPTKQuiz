import React from 'react';

const BaseSvg = ({ size = 20, color = 'currentColor', children, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    {children}
  </svg>
);

export const ClockIcon = (props) => (
  <BaseSvg {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseSvg>
);

export const PlayIcon = (props) => (
  <BaseSvg {...props}>
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
  </BaseSvg>
);

export const LockIcon = (props) => (
  <BaseSvg {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </BaseSvg>
);

export const CheckIcon = (props) => (
  <BaseSvg {...props}>
    <polyline points="20 6 9 17 4 12" />
  </BaseSvg>
);

export const CheckCircleIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </BaseSvg>
);

export const AlertTriangleIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </BaseSvg>
);

export const UserIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </BaseSvg>
);

export const LogOutIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </BaseSvg>
);

export const ShieldIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </BaseSvg>
);

export const SearchIcon = (props) => (
  <BaseSvg {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </BaseSvg>
);

export const AwardIcon = (props) => (
  <BaseSvg {...props}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </BaseSvg>
);

export const BookOpenIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </BaseSvg>
);

export const MenuIcon = (props) => (
  <BaseSvg {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </BaseSvg>
);

export const ChevronRightIcon = (props) => (
  <BaseSvg {...props}>
    <polyline points="9 18 15 12 9 6" />
  </BaseSvg>
);

export const MaximizeIcon = (props) => (
  <BaseSvg {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </BaseSvg>
);

export const PlusIcon = (props) => (
  <BaseSvg {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </BaseSvg>
);

export const TrashIcon = (props) => (
  <BaseSvg {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </BaseSvg>
);

export const RefreshCwIcon = (props) => (
  <BaseSvg {...props}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </BaseSvg>
);
