// ══════════════════════════════════════════════════════════════════
// 60+ Curated 2D Illustrated Profile Avatars (Based on Prompts)
// Categories: Cute Animals, World Places, Delicious Food, Sports & Life, Arts & Tech
// Renders into crisp high-res 180x180 2D PNG raster image data URLs
// ══════════════════════════════════════════════════════════════════

export const AVATAR_CATEGORIES = [
  { id: 'all', label: 'All (63)' },
  { id: 'nature_animals', label: '🐾 Cute Animals (13)' },
  { id: 'places_world', label: '🏛️ World Landmarks (15)' },
  { id: 'food_drinks', label: '🍰 Treats & Food (8)' },
  { id: 'sports_people', label: '🏃 Sports & Life (14)' },
  { id: 'arts_tech', label: '💡 Arts & Tech (13)' },
];

export const AVATAR_DEFINITIONS = [
  // ── 🐾 Animals & Wildlife (13) ──
  { id: 'german_shepherd', name: 'German Shepherd in Field', category: 'nature_animals', symbol: '🐕', colors: ['#b45309', '#78350f'] },
  { id: 'tuxedo_cat', name: 'Tuxedo Cat Sleeping', category: 'nature_animals', symbol: '🐈‍⬛', colors: ['#334155', '#1e293b'] },
  { id: 'cougar', name: 'Cougar on Branch', category: 'nature_animals', symbol: '🐆', colors: ['#d97706', '#92400e'] },
  { id: 'musk_ox', name: 'Musk Ox in Wild', category: 'nature_animals', symbol: '🐂', colors: ['#78716c', '#44403c'] },
  { id: 'llama', name: 'Llama Tongue Out', category: 'nature_animals', symbol: '🦙', colors: ['#eab308', '#a16207'] },
  { id: 'squirrel', name: 'Squirrel with Acorn', category: 'nature_animals', symbol: '🐿️', colors: ['#d97706', '#78350f'] },
  { id: 'koi_fish', name: 'Koi Fish in Pond', category: 'nature_animals', symbol: '🐟', colors: ['#ea580c', '#c2410c'] },
  { id: 'tropical_fish', name: 'Striped Tropical Fish', category: 'nature_animals', symbol: '🐠', colors: ['#06b6d4', '#0369a1'] },
  { id: 'flamingos', name: 'Flamingos over Lake', category: 'nature_animals', symbol: '🦩', colors: ['#f43f5e', '#be123c'] },
  { id: 'rainbow_trout', name: 'Rainbow Trout Jumping', category: 'nature_animals', symbol: '🎣', colors: ['#10b981', '#047857'] },
  { id: 'dalmatian', name: 'Dalmatian on Leash', category: 'nature_animals', symbol: '🐕‍🦺', colors: ['#475569', '#1e293b'] },
  { id: 'grizzly_bear', name: 'Grizzly Bear in Wilderness', category: 'nature_animals', symbol: '🐻', colors: ['#78350f', '#451a03'] },
  { id: 'husky_snow', name: 'Husky in Snowy Forest', category: 'nature_animals', symbol: '🐺', colors: ['#38bdf8', '#0369a1'] },

  // ── 🏛️ World Places & Landmarks (15) ──
  { id: 'rhine_river', name: 'Rhine River in Europe', category: 'places_world', symbol: '🏞️', colors: ['#0284c7', '#0f766e'] },
  { id: 'caribbean_boat', name: 'Boat Sailing the Pitons', category: 'places_world', symbol: '⛵', colors: ['#06b6d4', '#0284c7'] },
  { id: 'tokyo_tower', name: 'Tokyo Tower & Blossoms', category: 'places_world', symbol: '🗼', colors: ['#f43f5e', '#be123c'] },
  { id: 'paddy_fields', name: 'Terraced Paddy Fields', category: 'places_world', symbol: '🌾', colors: ['#10b981', '#047857'] },
  { id: 'austrian_alps', name: 'Austrian Alps Range', category: 'places_world', symbol: '🏔️', colors: ['#64748b', '#334155'] },
  { id: 'sagrada_familia', name: 'Sagrada Familia', category: 'places_world', symbol: '⛪', colors: ['#f59e0b', '#b45309'] },
  { id: 'istanbul_dome', name: 'Domed Building in Istanbul', category: 'places_world', symbol: '🕌', colors: ['#0d9488', '#115e59'] },
  { id: 'al_khazneh', name: 'Al-Khazneh in Petra', category: 'places_world', symbol: '🏛️', colors: ['#ea580c', '#9a3412'] },
  { id: 'blue_mosque', name: 'Blue Mosque in Istanbul', category: 'places_world', symbol: '🕍', colors: ['#0284c7', '#075985'] },
  { id: 'mont_blanc', name: 'Mont Blanc Huts in Alps', category: 'places_world', symbol: '🛖', colors: ['#475569', '#1e293b'] },
  { id: 'timbuktu', name: 'Timbuktu Ancient City', category: 'places_world', symbol: '🏜️', colors: ['#d97706', '#92400e'] },
  { id: 'stari_most', name: 'Stari Most Historic Bridge', category: 'places_world', symbol: '🌉', colors: ['#0284c7', '#0891b2'] },
  { id: 'acropolis', name: 'Acropolis of Athens', category: 'places_world', symbol: '🏛️', colors: ['#eab308', '#ca8a04'] },
  { id: 'el_angel', name: 'El Ángel Mexico Monument', category: 'places_world', symbol: '🗽', colors: ['#eab308', '#854d0e'] },
  { id: 'golden_gate', name: 'Golden Gate Bridge', category: 'places_world', symbol: '🌁', colors: ['#ef4444', '#b91c1c'] },

  // ── 🍰 Treats & Food (8) ──
  { id: 'tiramisu', name: 'Slice of Tiramisu', category: 'food_drinks', symbol: '🍰', colors: ['#92400e', '#451a03'] },
  { id: 'small_tomatoes', name: 'Small Tomatoes Grow', category: 'food_drinks', symbol: '🍅', colors: ['#ef4444', '#b91c1c'] },
  { id: 'hibiscus', name: 'Hibiscus Flower in Bloom', category: 'food_drinks', symbol: '🌺', colors: ['#f43f5e', '#9f1239'] },
  { id: 'nigiri_sushi', name: 'Nigiri with Chopsticks', category: 'food_drinks', symbol: '🍣', colors: ['#f97316', '#c2410c'] },
  { id: 'churros', name: 'Churros & Dipping Sauce', category: 'food_drinks', symbol: '🥖', colors: ['#d97706', '#78350f'] },
  { id: 'cookies_milk', name: 'Cookies & Bottle of Milk', category: 'food_drinks', symbol: '🍪', colors: ['#b45309', '#451a03'] },
  { id: 'strudel', name: 'Strudel on a Plate', category: 'food_drinks', symbol: '🥐', colors: ['#b45309', '#78350f'] },
  { id: 'raspberry_cake', name: 'Raspberry Pavlova Cake', category: 'food_drinks', symbol: '🎂', colors: ['#ec4899', '#9d174d'] },
  { id: 'blackberries', name: 'Blackberries in Basket', category: 'food_drinks', symbol: '🫐', colors: ['#4c1d95', '#1e1b4b'] },

  // ── 🏃 Sports & Life (14) ──
  { id: 'shutter_shades', name: 'Shutter Shades', category: 'sports_people', symbol: '🕶️', colors: ['#ec4899', '#be185d'] },
  { id: 'football_player', name: 'Football Player on Ground', category: 'sports_people', symbol: '🏈', colors: ['#16a34a', '#14532d'] },
  { id: 'jetski', name: 'Person on Jetski', category: 'sports_people', symbol: '🏄', colors: ['#0284c7', '#0369a1'] },
  { id: 'relay_race', name: 'Athletes Running Relay', category: 'sports_people', symbol: '🏃', colors: ['#f59e0b', '#d97706'] },
  { id: 'snowball_fight', name: 'Two People Throwing Snow', category: 'sports_people', symbol: '☃️', colors: ['#38bdf8', '#0284c7'] },
  { id: 'gymnast', name: 'Gymnast on Pommel Horse', category: 'sports_people', symbol: '🤸', colors: ['#6366f1', '#4338ca'] },
  { id: 'bicyclist', name: 'Bicyclist on Scenic Route', category: 'sports_people', symbol: '🚴', colors: ['#059669', '#064e3b'] },
  { id: 'racquetball', name: 'Person Playing Racquetball', category: 'sports_people', symbol: '🎾', colors: ['#84cc16', '#4d7c0f'] },
  { id: 'bicorne_hat', name: 'Portrait in Bicorne Hat', category: 'sports_people', symbol: '🎩', colors: ['#334155', '#0f172a'] },
  { id: 'swimmers_race', name: 'Three Swimmers in Lanes', category: 'sports_people', symbol: '🏊', colors: ['#0284c7', '#0369a1'] },
  { id: 'flip_flops', name: 'Flip-Flops on Sandy Beach', category: 'sports_people', symbol: '🩴', colors: ['#f59e0b', '#d97706'] },
  { id: 'furry_hat', name: 'Person in Furry Hat', category: 'sports_people', symbol: '🧔', colors: ['#78716c', '#44403c'] },
  { id: 'vaccine', name: 'Person Getting Vaccine', category: 'sports_people', symbol: '💉', colors: ['#06b6d4', '#0e7490'] },
  { id: 'sheath_dress', name: 'Sheath Dress on Mannequin', category: 'sports_people', symbol: '👗', colors: ['#ec4899', '#831843'] },

  // ── 💡 Arts & Tech (13) ──
  { id: 'motorcycle', name: 'Motorcycle on Road', category: 'arts_tech', symbol: '🏍️', colors: ['#475569', '#0f172a'] },
  { id: 'tapestry_loom', name: 'Tapestry on Loom', category: 'arts_tech', symbol: '🧶', colors: ['#8b5cf6', '#6d28d9'] },
  { id: 'clarinet', name: 'Clarinet Makes Music', category: 'arts_tech', symbol: '🎷', colors: ['#eab308', '#854d0e'] },
  { id: 'computer_chip', name: 'Close View Computer Chip', category: 'arts_tech', symbol: '💾', colors: ['#0284c7', '#0f172a'] },
  { id: 'shooting_star', name: 'Shooting Star in Sky', category: 'arts_tech', symbol: '🌠', colors: ['#8b5cf6', '#4c1d95'] },
  { id: 'satellite', name: 'Satellite Orbiting Planet', category: 'arts_tech', symbol: '🛰️', colors: ['#3b82f6', '#1e1b4b'] },
  { id: 'paint_palette', name: 'Paint Palette with Dabs', category: 'arts_tech', symbol: '🎨', colors: ['#ec4899', '#be185d'] },
  { id: 'cave_crystals', name: 'Stalactites Inside Cave', category: 'arts_tech', symbol: '🪨', colors: ['#64748b', '#334155'] },
  { id: 'origami_crane', name: 'Origami Crane', category: 'arts_tech', symbol: '🕊️', colors: ['#38bdf8', '#0284c7'] },
  { id: 'flashlight', name: 'Flashlight Beam On', category: 'arts_tech', symbol: '🔦', colors: ['#facc15', '#a16207'] },
  { id: 'drum_kit', name: 'Acoustic Drum Kit', category: 'arts_tech', symbol: '🥁', colors: ['#dc2626', '#7f1d1d'] },
  { id: 'strategy_board', name: 'Strategy Board Game', category: 'arts_tech', symbol: '♟️', colors: ['#334155', '#0f172a'] },
];

// In-memory cache for rendered 2D raster PNGs
const pngCache = new Map();

/**
 * Renders an avatar definition into a crisp 180x180 2D PNG Data URL
 */
export function getAvatar2DPng(avatar) {
  if (!avatar) return null;
  if (pngCache.has(avatar.id)) {
    return pngCache.get(avatar.id);
  }

  if (typeof document === 'undefined') return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const [c1, c2] = avatar.colors || ['#3b82f6', '#1d4ed8'];

    // 1. Circle clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(90, 90, 88, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // 2. Smooth Linear Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 180, 180);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 180, 180);

    // 3. Subtle ambient inner glow
    const innerShadow = ctx.createRadialGradient(90, 90, 50, 90, 90, 90);
    innerShadow.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
    innerShadow.addColorStop(0.7, 'transparent');
    innerShadow.addColorStop(1, 'rgba(0, 0, 0, 0.38)');
    ctx.fillStyle = innerShadow;
    ctx.fillRect(0, 0, 180, 180);

    // 4. Glossy Dome Arc (Top Specular Reflection)
    ctx.beginPath();
    ctx.ellipse(90, 48, 80, 46, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.fill();

    // 5. Centered 2D Subject Symbol with Depth Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 6;
    ctx.font = '80px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(avatar.symbol, 90, 96);

    // 6. Crisp Outer Specular Rim Highlight Ring
    ctx.restore();
    ctx.beginPath();
    ctx.arc(90, 90, 88, 0, Math.PI * 2);
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
  // Default to first item or deterministic index
  const defaultIdx = (rollNo.charCodeAt(rollNo.length - 1) || 0) % AVATAR_DEFINITIONS.length;
  return getAvatar2DPng(AVATAR_DEFINITIONS[defaultIdx]);
}

export function saveStudentAvatar(rollNo, avatarId) {
  if (!rollNo) rollNo = 'student';
  localStorage.setItem(`gptk_avatar_${rollNo}`, avatarId);
}
