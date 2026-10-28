import React from 'react';

const Svg = ({ size = 20, color = 'rgba(255, 255, 255, 0.95)', fill = 'none', children, strokeWidth = '1.8' }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={color}
    strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >{children}</svg>
);

export const ClockIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></Svg>
);
export const PlayIcon = (p) => (
  <Svg {...p} fill="rgba(255, 255, 255, 0.95)">
    <path d="M7 4.5v15c0 .9 1 1.4 1.7.9l11.5-7.5c.7-.5.7-1.4 0-1.9L8.7 3.6C8 3.1 7 3.6 7 4.5z" stroke="none" />
  </Svg>
);
export const LockIcon = (p) => (
  <Svg {...p}><rect x="4" y="11" width="16" height="10" rx="3" ry="3" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Svg>
);
export const CheckIcon = (p) => (
  <Svg {...p} strokeWidth="2.2"><polyline points="20 6 9 17 4 12" /></Svg>
);
export const CheckCircleIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><polyline points="8 12 11 15 16 9" strokeWidth="2" /></Svg>
);
export const AlertTriangleIcon = (p) => (
  <Svg {...p}>
    <path d="M10.3 4.2L2.6 17.8c-.8 1.4.2 3.2 1.8 3.2h15.2c1.6 0 2.6-1.8 1.8-3.2L13.7 4.2c-.8-1.4-2.6-1.4-3.4 0z" />
    <line x1="12" y1="10" x2="12" y2="14" />
    <circle cx="12" cy="17.5" r=".75" fill="rgba(255, 255, 255, 0.95)" stroke="none" />
  </Svg>
);
export const UserIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></Svg>
);
export const LogOutIcon = (p) => (
  <Svg {...p}>
    <path d="M9 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h3" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Svg>
);
export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 2L4 5.5v6.2c0 5 3.4 9.7 8 10.8 4.6-1.1 8-5.8 8-10.8V5.5L12 2z" /></Svg>
);
export const SearchIcon = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7.5" /><line x1="21" y1="21" x2="16.5" y2="16.5" /></Svg>
);
export const AwardIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="8" r="6" /><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" /></Svg>
);
export const BookOpenIcon = (p) => (
  <Svg {...p}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 0 0-2.5 2.5z" />
    <path d="M6 6h10" /><path d="M6 10h10" />
  </Svg>
);
export const ChevronDownIcon = (p) => (
  <Svg {...p}><polyline points="6 9 12 15 18 9" /></Svg>
);
export const ChevronRightIcon = (p) => (
  <Svg {...p}><polyline points="9 18 15 12 9 6" /></Svg>
);
export const PlusIcon = (p) => (
  <Svg {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Svg>
);
export const TrashIcon = (p) => (
  <Svg {...p}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </Svg>
);
export const EditIcon = (p) => (
  <Svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></Svg>
);
export const PackageIcon = (p) => (
  <Svg {...p}>
    <polyline points="16.5 9.4 7.5 4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </Svg>
);
export const CalendarIcon = (p) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Svg>
);
export const SparkleIcon = (p) => (
  <Svg {...p}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </Svg>
);
export const XIcon = (p) => (
  <Svg {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
);
export const TargetIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </Svg>
);
export const TrophyIcon = (p) => (
  <Svg {...p}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </Svg>
);
export const RadioIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
  </Svg>
);
export const MessageIcon = (p) => (
  <Svg {...p}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </Svg>
);
