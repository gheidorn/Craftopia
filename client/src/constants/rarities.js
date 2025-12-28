export const RARITIES = {
  1: {
    name: 'Common',
    color: '#94a3b8',
    className: 'rarity-common',
  },
  2: {
    name: 'Uncommon',
    color: '#10b981',
    className: 'rarity-uncommon',
  },
  3: {
    name: 'Rare',
    color: '#3b82f6',
    className: 'rarity-rare',
  },
  4: {
    name: 'Epic',
    color: '#a855f7',
    className: 'rarity-epic',
  },
  5: {
    name: 'Legendary',
    color: '#f59e0b',
    className: 'rarity-legendary',
  },
};

export const getRarityInfo = (rarityId) => {
  return RARITIES[rarityId] || RARITIES[1];
};
