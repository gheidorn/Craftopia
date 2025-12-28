const pool = require('../config/database');

// Base spawn rates (for 1-10 minute farming sessions)
const BASE_SPAWN_RATES = {
  5: 0.01,  // Legendary - 1%
  4: 0.04,  // Epic - 4%
  3: 0.10,  // Rare - 10%
  2: 0.25,  // Uncommon - 25%
  1: 0.60,  // Common - 60%
};

// Calculate quantity multiplier based on duration
const getQuantityMultiplier = (durationMinutes) => {
  if (durationMinutes >= 46) return 3.0;   // 46-60 min: 3x
  if (durationMinutes >= 31) return 2.5;   // 31-45 min: 2.5x
  if (durationMinutes >= 21) return 2.0;   // 21-30 min: 2x
  if (durationMinutes >= 11) return 1.5;   // 11-20 min: 1.5x
  return 1.0;                               // 1-10 min: 1x
};

// Calculate adjusted spawn rates based on duration
const getAdjustedSpawnRates = (durationMinutes) => {
  // Short sessions (1-10 min): Base rates
  if (durationMinutes <= 10) {
    return BASE_SPAWN_RATES;
  }

  // Medium sessions (11-30 min): Slightly better odds
  if (durationMinutes <= 30) {
    return {
      5: 0.02,  // Legendary - 2% (+1%)
      4: 0.06,  // Epic - 6% (+2%)
      3: 0.14,  // Rare - 14% (+4%)
      2: 0.28,  // Uncommon - 28% (+3%)
      1: 0.50,  // Common - 50% (-10%)
    };
  }

  // Long sessions (31-60 min): Much better odds
  return {
    5: 0.05,  // Legendary - 5% (+4%)
    4: 0.10,  // Epic - 10% (+6%)
    3: 0.20,  // Rare - 20% (+10%)
    2: 0.30,  // Uncommon - 30% (+5%)
    1: 0.35,  // Common - 35% (-25%)
  };
};

// Roll for material rarity based on spawn chances
const rollRarity = (spawnRates = BASE_SPAWN_RATES) => {
  const roll = Math.random();
  let cumulative = 0;

  // Check from legendary (rarest) to common
  for (let rarity = 5; rarity >= 1; rarity--) {
    cumulative += spawnRates[rarity];
    if (roll < cumulative) {
      return rarity;
    }
  }

  // Fallback to common (should never reach here)
  return 1;
};

// Get a random material from a category with the given rarity
const getMaterialByRarity = async (category, rarityId) => {
  const query = `
    SELECT id, name, category, rarity_id, vendor_value
    FROM materials
    WHERE category = $1 AND rarity_id = $2
    LIMIT 1
  `;

  const result = await pool.query(query, [category, rarityId]);

  if (result.rows.length === 0) {
    throw new Error(`No material found for category ${category} with rarity ${rarityId}`);
  }

  return result.rows[0];
};

// Roll for a random material in a category with duration-based bonuses
const rollMaterial = async (category, durationMinutes = 5) => {
  // Get adjusted spawn rates based on duration
  const spawnRates = getAdjustedSpawnRates(durationMinutes);

  // Roll for rarity with adjusted odds
  const rarityId = rollRarity(spawnRates);
  const material = await getMaterialByRarity(category, rarityId);

  // Roll for base quantity (1-5)
  const baseQuantity = Math.floor(Math.random() * 5) + 1;

  // Apply duration multiplier
  const multiplier = getQuantityMultiplier(durationMinutes);
  const quantity = Math.floor(baseQuantity * multiplier);

  return {
    material,
    quantity,
    multiplier, // Include for debugging/display purposes
  };
};

// Get rarity name
const getRarityName = (rarityId) => {
  const rarityNames = {
    1: 'Common',
    2: 'Uncommon',
    3: 'Rare',
    4: 'Epic',
    5: 'Legendary',
  };

  return rarityNames[rarityId] || 'Unknown';
};

module.exports = {
  rollRarity,
  getMaterialByRarity,
  rollMaterial,
  getRarityName,
  BASE_SPAWN_RATES,
  getQuantityMultiplier,
  getAdjustedSpawnRates,
};
