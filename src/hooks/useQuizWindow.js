import { useState, useEffect } from 'react';

// Parses "10:00 AM" into today's Date object
export function parseTimeString(timeStr) {
  if (!timeStr) return null;
  const now = new Date();
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const modifier = match[3] ? match[3].toUpperCase() : null;

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const target = new Date(now);
  target.setHours(hours, minutes, 0, 0);
  return target;
}

export function useQuizWindow(windowStart = "10:00 AM", windowEnd = "05:00 PM", durationMinutes = 15) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startDate = parseTimeString(windowStart);
  const endDate = parseTimeString(windowEnd);

  let status = 'closed'; // 'upcoming' | 'open' | 'closed'
  let label = 'Window Closed';
  let remainingWindowSeconds = 0;

  if (startDate && endDate) {
    if (now < startDate) {
      status = 'upcoming';
      label = `Starts at ${windowStart}`;
      remainingWindowSeconds = Math.max(0, Math.floor((startDate - now) / 1000));
    } else if (now >= startDate && now <= endDate) {
      status = 'open';
      label = `Live Now (Closes ${windowEnd})`;
      remainingWindowSeconds = Math.max(0, Math.floor((endDate - now) / 1000));
    } else {
      status = 'closed';
      label = 'Window Closed / Ended';
      remainingWindowSeconds = 0;
    }
  }

  // Personal 15-minute countdown capped at 5:00 PM
  const calculateStudentDuration = () => {
    const defaultSec = durationMinutes * 60;
    if (status !== 'open') return 0;
    return Math.min(defaultSec, remainingWindowSeconds);
  };

  return {
    status,
    isOpen: status === 'open',
    label,
    remainingWindowSeconds,
    calculateStudentDuration,
    windowStart,
    windowEnd,
    durationMinutes
  };
}
