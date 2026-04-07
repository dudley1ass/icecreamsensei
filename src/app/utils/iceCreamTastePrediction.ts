/**
 * Ice-cream mix taste prediction (cake-app style: weighted flavour signals per gram).
 */

export type FlavorKey =
  | 'chocolate'
  | 'fruit'
  | 'tart'
  | 'bitter'
  | 'nutty'
  | 'spice'
  | 'floral'
  | 'caramel'
  | 'citrus'
  | 'tropical'
  | 'earthy'
  | 'boozy'
  | 'savory'
  | 'minty'
  | 'coffee'
  | 'coconut';

const TASTE_SATURATION: Record<FlavorKey, number> = {
  chocolate: 80,
  fruit: 200,
  tart: 150,
  bitter: 60,
  nutty: 100,
  spice: 15,
  floral: 8,
  caramel: 100,
  citrus: 20,
  tropical: 150,
  earthy: 150,
  boozy: 60,
  savory: 50,
  minty: 5,
  coffee: 12,
  coconut: 120,
};

const FLAVOR_LABELS: Record<FlavorKey, string> = {
  chocolate: 'Chocolate',
  fruit: 'Fruity',
  tart: 'Tart',
  bitter: 'Bitter',
  nutty: 'Nutty',
  spice: 'Spiced',
  floral: 'Floral',
  caramel: 'Caramel',
  citrus: 'Citrus',
  tropical: 'Tropical',
  earthy: 'Earthy',
  boozy: 'Boozy',
  savory: 'Savory',
  minty: 'Minty',
  coffee: 'Coffee',
  coconut: 'Coconut',
};

const FLAVOR_EMOJIS: Record<FlavorKey, string> = {
  chocolate: '🍫',
  fruit: '🍓',
  tart: '🍋',
  bitter: '😬',
  nutty: '🥜',
  spice: '🌶️',
  floral: '🌸',
  caramel: '🍯',
  citrus: '🍊',
  tropical: '🌴',
  earthy: '🌿',
  boozy: '🥃',
  savory: '🧂',
  minty: '🌱',
  coffee: '☕',
  coconut: '🥥',
};

/** Per-ingredient-key overrides (0–1 weights per signal, multiplied by grams). */
const ICE_SIGNALS: Record<string, Partial<Record<FlavorKey, number>>> = {
  cocoa_powder: { chocolate: 1, bitter: 0.85 },
  dark_chocolate_70: { chocolate: 1, bitter: 0.55 },
  dark_chocolate_85: { chocolate: 1, bitter: 0.75 },
  milk_chocolate: { chocolate: 0.75, caramel: 0.2 },
  white_chocolate: { chocolate: 0.35, caramel: 0.4 },
  chocolate_chips: { chocolate: 0.85, bitter: 0.35 },
  chocolate_syrup: { chocolate: 0.7, caramel: 0.25 },
  nutella: { chocolate: 0.65, nutty: 0.55 },
  cocoa_nibs: { chocolate: 0.85, bitter: 0.9 },
  mini_chocolate_chips: { chocolate: 0.85 },
  white_chocolate_chips: { chocolate: 0.4 },
  dark_chocolate_chunks: { chocolate: 0.95, bitter: 0.5 },

  strawberry_puree: { fruit: 1, tart: 0.35 },
  strawberry_fresh: { fruit: 0.95, tart: 0.35 },
  blueberry_puree: { fruit: 1, tart: 0.25 },
  raspberry_puree: { fruit: 1, tart: 0.75 },
  lemon_juice: { citrus: 1, tart: 0.95 },
  lime_juice: { citrus: 1, tart: 0.9 },
  orange_juice: { citrus: 0.85, fruit: 0.4 },
  lemon_zest: { citrus: 0.9, tart: 0.5 },
  passion_fruit_puree: { fruit: 0.95, tart: 0.6, tropical: 0.7 },
  mango_puree: { fruit: 0.95, tropical: 0.85 },
  pineapple_puree: { fruit: 0.85, tropical: 1, tart: 0.35 },
  coconut_puree: { coconut: 1, tropical: 0.5 },
  cranberry_sauce: { fruit: 0.75, tart: 0.95 },

  peanut_butter: { nutty: 1, savory: 0.25 },
  almond_butter: { nutty: 0.9 },
  tahini: { nutty: 0.75, bitter: 0.25, savory: 0.35 },
  pistachio_paste: { nutty: 0.95 },
  almonds_chopped: { nutty: 0.95 },
  pecans_chopped: { nutty: 1, caramel: 0.25 },
  walnuts_chopped: { nutty: 0.95, bitter: 0.2 },
  peanut_butter_chips: { nutty: 0.9 },
  cookie_pieces: { chocolate: 0.45, caramel: 0.15 },
  oreo_crushed: { chocolate: 0.5 },
  nut_paste: { nutty: 0.9 },

  brown_sugar: { caramel: 0.45 },
  honey: { caramel: 0.3, floral: 0.25 },
  maple_syrup: { caramel: 0.65 },
  molasses: { caramel: 0.75, bitter: 0.35 },
  caramel_sauce: { caramel: 1 },
  dulce_de_leche: { caramel: 1 },

  mint_extract: { minty: 1 },
  matcha_tea: { earthy: 0.65, bitter: 0.55 },
  espresso: { coffee: 1, bitter: 0.45 },
  coffee_brewed: { coffee: 0.35 },
  vanilla_extract: { floral: 0.15 },
  almond_extract: { nutty: 0.45, floral: 0.2 },

  buttermilk: { tart: 0.2 },
  sour_cream: { tart: 0.15 },
  greek_yogurt: { tart: 0.2 },
  cream_cheese: { tart: 0.12 },
  salt: { savory: 0.8 },

  coconut_oil: { coconut: 0.35 },
  coconut_cream: { coconut: 0.55 },
  coconut_milk: { coconut: 0.4 },
};

export interface IceCreamTasteResult {
  dominantFlavor: string;
  tasteNotes: string;
  flavorProfile: string[];
  chocolateScore: number;
  fruitinessScore: number;
  spiceScore: number;
  nuttinessScore: number;
  tartScore: number;
  bitternessScore: number;
  tasteWarnings: string[];
}

function emptySignals(): Record<FlavorKey, number> {
  return {
    chocolate: 0,
    fruit: 0,
    tart: 0,
    bitter: 0,
    nutty: 0,
    spice: 0,
    floral: 0,
    caramel: 0,
    citrus: 0,
    tropical: 0,
    earthy: 0,
    boozy: 0,
    savory: 0,
    minty: 0,
    coffee: 0,
    coconut: 0,
  };
}

function categoryFallback(
  key: string,
  category: string,
  label: string,
): Partial<Record<FlavorKey, number>> {
  const L = label.toLowerCase();
  if (ICE_SIGNALS[key]) return ICE_SIGNALS[key];

  if (category === 'Fruit') {
    const tart = L.includes('lemon') || L.includes('lime') || L.includes('cranberry') || L.includes('cherry') ? 0.55 : 0.28;
    return { fruit: 0.88, tart };
  }
  if (category === 'Chocolate') return { chocolate: 0.92, bitter: L.includes('dark') || L.includes('cocoa') ? 0.45 : 0.25 };
  if (category === 'Nuts/Seeds') return { nutty: 0.92, bitter: L.includes('walnut') ? 0.2 : 0 };
  if (category === 'Mix-ins') {
    if (L.includes('chocolate') || L.includes('cocoa') || L.includes('brownie') || L.includes('fudge')) return { chocolate: 0.55, caramel: 0.2 };
    if (L.includes('peanut') || L.includes('nut') || L.includes('pecan')) return { nutty: 0.65 };
    if (L.includes('caramel') || L.includes('butterscotch') || L.includes('toffee')) return { caramel: 0.75 };
    return { caramel: 0.15 };
  }
  if (category === 'Sweetener') {
    if (L.includes('brown') || L.includes('molasses') || L.includes('maple') || L.includes('honey')) return { caramel: 0.4 };
    return {};
  }
  if (category === 'Flavoring') {
    if (L.includes('mint')) return { minty: 1 };
    if (L.includes('almond')) return { nutty: 0.4, floral: 0.15 };
    if (L.includes('lemon') || L.includes('citrus')) return { citrus: 0.85, tart: 0.5 };
    return { floral: 0.12 };
  }
  return {};
}

function buildIceCreamTasteNotes(top: FlavorKey[], sweetnessPct: number): string {
  const sweetDesc =
    sweetnessPct > 18 ? 'very sweet' : sweetnessPct > 14 ? 'balanced sweet' : sweetnessPct > 10 ? 'lightly sweet' : 'not very sweet';

  if (top.length === 0) {
    return `A clean, ${sweetDesc} dairy base — cream and vanilla will carry the scoop.`;
  }

  const a = top[0];
  const b = top[1];
  const combos: Record<string, string> = {
    'chocolate+fruit': 'Chocolate-forward with bright fruit — think stracciatella or berry ripple.',
    'chocolate+nutty': 'Rich chocolate with toasty nuts — classic rocky road energy.',
    'chocolate+caramel': 'Deep chocolate and buttery caramel — very dessert-forward.',
    'chocolate+coffee': 'Mocha-like depth — coffee lifts the chocolate without taking over.',
    'chocolate+minty': 'Cool mint and chocolate — unmistakably nostalgic.',
    'fruit+tart': 'Bright, tangy fruit — refreshing and palate-cleansing when cold.',
    'fruit+tropical': 'Tropical fruit sunshine — great for sorbet-style brightness in cream.',
    'citrus+tart': 'Zippy citrus — keep sugar in check so it doesn’t read harsh when frozen.',
    'nutty+caramel': 'Toasted nuts and caramel — indulgent and scoop-shop ready.',
    'coconut+tropical': 'Coconut and tropical fruit — lush and vacation-y.',
  };
  if (b) {
    const k1 = `${a}+${b}`;
    const k2 = `${b}+${a}`;
    if (combos[k1]) return combos[k1];
    if (combos[k2]) return combos[k2];
  }

  const singles: Partial<Record<FlavorKey, string>> = {
    chocolate: `Rich, ${sweetDesc} chocolate leads the pint.`,
    fruit: `Fruit flavour drives the scoop — keep mix-ins small to limit iciness.`,
    tart: `Noticeably tart — pairs well with extra sugar or fat for balance frozen.`,
    bitter: `Bitter notes are forward — common with cocoa nibs or very dark chocolate.`,
    nutty: `Toasty, nutty depth throughout.`,
    spice: `Warming spice presence — a little goes a long way cold.`,
    caramel: `Caramel/brown sugar warmth — lovely with dairy fat.`,
    citrus: `Bright citrus oils — aromatic even at freezer temp.`,
    tropical: `Tropical fruit character — bold and sunny.`,
    minty: `Cool mint — iconic with chocolate chips.`,
    coffee: `Roasted coffee notes — excellent in mocha bases.`,
    coconut: `Coconut creaminess and flavour.`,
  };
  return singles[a] ?? 'Balanced flavour profile for a frozen dessert.';
}

export function getScoreLabel(score: number): string {
  if (score < 20) return 'Very Low';
  if (score < 40) return 'Low';
  if (score < 60) return 'Medium';
  if (score < 80) return 'High';
  return 'Very High';
}

export function getScoreColor(score: number): string {
  if (score < 25) return '#60a5fa';
  if (score < 50) return '#34d399';
  if (score < 75) return '#fbbf24';
  return '#f87171';
}

export function computeIceCreamTaste(
  rows: { key: string; grams: number }[],
  profiles: Record<string, { category: string; label: string }>,
  sugarPct: number,
): IceCreamTasteResult {
  const raw = emptySignals();

  for (const row of rows) {
    const g = Number(row.grams || 0);
    if (g <= 0) continue;
    const p = profiles[row.key];
    if (!p) continue;
    const sig = categoryFallback(row.key, p.category, p.label);
    (Object.entries(sig) as [FlavorKey, number][]).forEach(([k, w]) => {
      if (w != null) raw[k] += g * w;
    });
  }

  const flavorScores = {} as Record<FlavorKey, number>;
  (Object.keys(raw) as FlavorKey[]).forEach((k) => {
    const sat = TASTE_SATURATION[k] ?? 100;
    flavorScores[k] = Math.min(100, Math.round((raw[k] / sat) * 100));
  });

  const THRESHOLD = 12;
  const flavorProfile = (Object.keys(flavorScores) as FlavorKey[])
    .filter((k) => flavorScores[k] >= THRESHOLD)
    .sort((a, b) => flavorScores[b] - flavorScores[a])
    .map((k) => `${FLAVOR_EMOJIS[k]} ${FLAVOR_LABELS[k]}`);

  const topFlavors = (Object.keys(flavorScores) as FlavorKey[])
    .filter((k) => flavorScores[k] >= THRESHOLD)
    .sort((a, b) => flavorScores[b] - flavorScores[a]);

  let dominantFlavor = '🍦 Classic dairy';
  if (topFlavors.length > 0) {
    dominantFlavor = `${FLAVOR_EMOJIS[topFlavors[0]]} ${FLAVOR_LABELS[topFlavors[0]]}`;
  }

  const tasteNotes = buildIceCreamTasteNotes(topFlavors, sugarPct);
  const tasteWarnings: string[] = [];

  if (flavorScores.bitter > 70) tasteWarnings.push('Bitterness is high — consider more sugar or milk solids to balance in the cold.');
  if (flavorScores.tart > 75 && sugarPct < 14) tasteWarnings.push('Tart + lower sugar can taste sharp frozen — a touch more sweetener often helps.');
  if (flavorScores.minty > 55) tasteWarnings.push('Mint is potent cold — easy to overshoot; taste the base warm first.');
  if (sugarPct > 20) tasteWarnings.push('Sugar is high — expect softer scoop and faster melt.');
  if (sugarPct < 12) tasteWarnings.push('Sugar is on the low side — mix may freeze hard; PAC may feel low.');

  return {
    dominantFlavor,
    tasteNotes,
    flavorProfile,
    chocolateScore: flavorScores.chocolate,
    fruitinessScore: Math.max(flavorScores.fruit, flavorScores.tropical),
    spiceScore: flavorScores.spice,
    nuttinessScore: flavorScores.nutty,
    tartScore: Math.max(flavorScores.tart, flavorScores.citrus),
    bitternessScore: flavorScores.bitter,
    tasteWarnings: [...new Set(tasteWarnings)],
  };
}
