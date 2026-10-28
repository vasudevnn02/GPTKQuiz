// ══════════════════════════════════════════════════════════════════
// 50+ Curated 2D Illustrated Profile Avatars
// Categories: India & Heritage, Cute Animals, Famous Places, Tech & Things
// Renders into high-res real 2D PNG raster image data URLs
// ══════════════════════════════════════════════════════════════════

export const AVATAR_CATEGORIES = [
  { id: 'all', label: 'All (56)' },
  { id: 'india', label: '🇮🇳 India & Heritage (14)' },
  { id: 'animals', label: '🐾 Cute Animals (16)' },
  { id: 'places', label: '🏛️ Places & Nature (12)' },
  { id: 'things', label: '💡 Tech & Things (14)' },
];

export const AVATAR_DEFINITIONS = [
  // ── 🇮🇳 India & Heritage (14) ──
  { id: 'ind_tiger', name: 'Royal Bengal Tiger', category: 'india', symbol: '🐯', colors: ['#f97316', '#c2410c'] },
  { id: 'ind_peacock', name: 'Royal Peacock', category: 'india', symbol: '🦚', colors: ['#0284c7', '#0369a1'] },
  { id: 'ind_elephant', name: 'Temple Elephant', category: 'india', symbol: '🐘', colors: ['#475569', '#1e293b'] },
  { id: 'ind_lotus', name: 'Sacred Lotus', category: 'india', symbol: '🪷', colors: ['#ec4899', '#be185d'] },
  { id: 'ind_taj', name: 'Taj Mahal', category: 'india', symbol: '🕌', colors: ['#06b6d4', '#0e7490'] },
  { id: 'ind_isro', name: 'ISRO Chandrayaan', category: 'india', symbol: '🚀', colors: ['#f59e0b', '#d97706'] },
  { id: 'ind_chai', name: 'Masala Cutting Chai', category: 'india', symbol: '☕', colors: ['#d97706', '#92400e'] },
  { id: 'ind_cricket', name: 'Cricket Champion', category: 'india', symbol: '🏏', colors: ['#10b981', '#047857'] },
  { id: 'ind_diya', name: 'Golden Festive Diya', category: 'india', symbol: '🪔', colors: ['#eab308', '#ca8a04'] },
  { id: 'ind_auto', name: 'Desi Auto Rickshaw', category: 'india', symbol: '🛺', colors: ['#eab308', '#854d0e'] },
  { id: 'ind_mango', name: 'Alphonso Mango', category: 'india', symbol: '🥭', colors: ['#f59e0b', '#b45309'] },
  { id: 'ind_samosa', name: 'Crispy Samosa', category: 'india', symbol: '🥟', colors: ['#d97706', '#78350f'] },
  { id: 'ind_tabla', name: 'Classical Tabla', category: 'india', symbol: '🪘', colors: ['#8b5cf6', '#6d28d9'] },
  { id: 'ind_namaste', name: 'Namaste Spirit', category: 'india', symbol: '🙏', colors: ['#f43f5e', '#be123c'] },

  // ── 🐾 Cute Animals (16) ──
  { id: 'an_cat', name: 'Sleepy Cat', category: 'animals', symbol: '🐱', colors: ['#f59e0b', '#d97706'] },
  { id: 'an_shiba', name: 'Shiba Doge', category: 'animals', symbol: '🐶', colors: ['#ea580c', '#c2410c'] },
  { id: 'an_panda', name: 'Fluffy Panda', category: 'animals', symbol: '🐼', colors: ['#334155', '#0f172a'] },
  { id: 'an_fox', name: 'Clever Fox', category: 'animals', symbol: '🦊', colors: ['#ea580c', '#9a3412'] },
  { id: 'an_bunny', name: 'Sweet Bunny', category: 'animals', symbol: '🐰', colors: ['#f472b6', '#db2777'] },
  { id: 'an_owl', name: 'Wise Owl', category: 'animals', symbol: '🦉', colors: ['#6366f1', '#4338ca'] },
  { id: 'an_penguin', name: 'Chill Penguin', category: 'animals', symbol: '🐧', colors: ['#0284c7', '#075985'] },
  { id: 'an_koala', name: 'Chill Koala', category: 'animals', symbol: '🐨', colors: ['#64748b', '#334155'] },
  { id: 'an_lion', name: 'Brave Simba', category: 'animals', symbol: '🦁', colors: ['#f59e0b', '#b45309'] },
  { id: 'an_dolphin', name: 'Ocean Dolphin', category: 'animals', symbol: '🐬', colors: ['#06b6d4', '#0891b2'] },
  { id: 'an_otter', name: 'Playful Otter', category: 'animals', symbol: '🦦', colors: ['#78716c', '#44403c'] },
  { id: 'an_hamster', name: 'Cheeky Hamster', category: 'animals', symbol: '🐹', colors: ['#fb923c', '#ea580c'] },
  { id: 'an_unicorn', name: 'Mystic Unicorn', category: 'animals', symbol: '🦄', colors: ['#d946ef', '#a21caf'] },
  { id: 'an_bear', name: 'Grizzly Bear', category: 'animals', symbol: '🐻', colors: ['#78350f', '#451a03'] },
  { id: 'an_deer', name: 'Forest Fawn', category: 'animals', symbol: '🦌', colors: ['#92400e', '#713f12'] },
  { id: 'an_butterfly', name: 'Prism Butterfly', category: 'animals', symbol: '🦋', colors: ['#38bdf8', '#0284c7'] },

  // ── 🏛️ Places & Nature (12) ──
  { id: 'pl_himalayas', name: 'Himalayan Peak', category: 'places', symbol: '🏔️', colors: ['#38bdf8', '#0369a1'] },
  { id: 'pl_beach', name: 'Tropical Paradise', category: 'places', symbol: '🏝️', colors: ['#14b8a6', '#0f766e'] },
  { id: 'pl_temple', name: 'Sacred Shrine', category: 'places', symbol: '⛩️', colors: ['#ef4444', '#b91c1c'] },
  { id: 'pl_fuji', name: 'Mount Fuji', category: 'places', symbol: '🗻', colors: ['#6366f1', '#4338ca'] },
  { id: 'pl_volcano', name: 'Magma Volcano', category: 'places', symbol: '🌋', colors: ['#dc2626', '#991b1b'] },
  { id: 'pl_galaxy', name: 'Cosmic Nebula', category: 'places', symbol: '🌌', colors: ['#8b5cf6', '#4c1d95'] },
  { id: 'pl_aurora', name: 'Northern Lights', category: 'places', symbol: '✨', colors: ['#10b981', '#065f46'] },
  { id: 'pl_forest', name: 'Evergreen Forest', category: 'places', symbol: '🌲', colors: ['#059669', '#064e3b'] },
  { id: 'pl_sunset', name: 'Sunset Horizon', category: 'places', symbol: '🌅', colors: ['#f97316', '#c2410c'] },
  { id: 'pl_statue', name: 'Gateway Monument', category: 'places', symbol: '🏛️', colors: ['#64748b', '#334155'] },
  { id: 'pl_desert', name: 'Sahara Dunes', category: 'places', symbol: '🏜️', colors: ['#d97706', '#92400e'] },
  { id: 'pl_city', name: 'Neon Cyber City', category: 'places', symbol: '🌆', colors: ['#ec4899', '#831843'] },

  // ── 💡 Tech & Things (14) ──
  { id: 'th_grad', name: 'Graduation Scholar', category: 'things', symbol: '🎓', colors: ['#3b82f6', '#1d4ed8'] },
  { id: 'th_laptop', name: 'Coder Laptop', category: 'things', symbol: '💻', colors: ['#0284c7', '#0369a1'] },
  { id: 'th_telescope', name: 'Astro Telescope', category: 'things', symbol: '🔭', colors: ['#7c3aed', '#5b21b6'] },
  { id: 'th_microscope', name: 'Lab Microscope', category: 'things', symbol: '🔬', colors: ['#059669', '#047857'] },
  { id: 'th_atom', name: 'Quantum Core', category: 'things', symbol: '⚛️', colors: ['#06b6d4', '#0e7490'] },
  { id: 'th_books', name: 'Library Tome', category: 'things', symbol: '📚', colors: ['#f59e0b', '#b45309'] },
  { id: 'th_game', name: 'Pro Controller', category: 'things', symbol: '🎮', colors: ['#a855f7', '#7e22ce'] },
  { id: 'th_guitar', name: 'Rock Guitar', category: 'things', symbol: '🎸', colors: ['#ef4444', '#b91c1c'] },
  { id: 'th_palette', name: 'Art Palette', category: 'things', symbol: '🎨', colors: ['#ec4899', '#be185d'] },
  { id: 'th_trophy', name: 'Golden Champion', category: 'things', symbol: '🏆', colors: ['#eab308', '#a16207'] },
  { id: 'th_drone', name: 'Aero Drone', category: 'things', symbol: '🛸', colors: ['#06b6d4', '#0f766e'] },
  { id: 'th_camera', name: 'Vintage Camera', category: 'things', symbol: '📷', colors: ['#64748b', '#1e293b'] },
  { id: 'th_lightbulb', name: 'Brilliant Idea', category: 'things', symbol: '💡', colors: ['#facc15', '#ca8a04'] },
  { id: 'th_crown', name: 'Sovereign Crown', category: 'things', symbol: '👑', colors: ['#f59e0b', '#92400e'] },
];

// In-memory cache for rendered 2D raster PNGs
const pngCache = new Map();

/**
 * Renders an avatar definition into a crisp 160x160 2D PNG Data URL
 */
export function getAvatar2DPng(avatar) {
  if (!avatar) return null;
  if (pngCache.has(avatar.id)) {
    return pngCache.get(avatar.id);
  }

  if (typeof document === 'undefined') return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const [c1, c2] = avatar.colors || ['#3b82f6', '#1d4ed8'];

    // 1. Circle clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(80, 80, 78, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // 2. Smooth Radial & Linear Gradient
    const grad = ctx.createLinearGradient(0, 0, 160, 160);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 160, 160);

    // 3. Subtle ambient inner shadow
    const innerShadow = ctx.createRadialGradient(80, 80, 50, 80, 80, 80);
    innerShadow.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    innerShadow.addColorStop(0.7, 'transparent');
    innerShadow.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    ctx.fillStyle = innerShadow;
    ctx.fillRect(0, 0, 160, 160);

    // 4. Centered Character / Icon with soft drop-shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;
    ctx.font = '72px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(avatar.symbol, 80, 84);

    // 5. Crisp Specular Top Rim Highlight
    ctx.restore();
    ctx.beginPath();
    ctx.arc(80, 80, 78, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 3;
    ctx.stroke();

    const dataUrl = canvas.toDataURL('image/png');
    pngCache.set(avatar.id, dataUrl);
    return dataUrl;
  } catch (err) {
    console.warn("Avatar canvas error:", err);
    return null;
  }
}

/**
 * Gets student saved avatar or falls back to default avatar for rollNo
 */
export function getSavedStudentAvatar(rollNo) {
  if (!rollNo) rollNo = 'student';
  const savedId = localStorage.getItem(`gptk_avatar_${rollNo}`);
  if (savedId) {
    const found = AVATAR_DEFINITIONS.find(a => a.id === savedId);
    if (found) return getAvatar2DPng(found);
  }
  // Default to Royal Bengal Tiger or Peacock based on rollNo char
  const defaultIdx = (rollNo.charCodeAt(rollNo.length - 1) || 0) % AVATAR_DEFINITIONS.length;
  return getAvatar2DPng(AVATAR_DEFINITIONS[defaultIdx]);
}

export function saveStudentAvatar(rollNo, avatarId) {
  if (!rollNo) rollNo = 'student';
  localStorage.setItem(`gptk_avatar_${rollNo}`, avatarId);
}
