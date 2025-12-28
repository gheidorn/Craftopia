import React from 'react';
import { getRarityInfo } from '../../constants/rarities';
import './RarityBadge.css';

const RarityBadge = ({ rarityId }) => {
  const rarity = getRarityInfo(rarityId);

  return (
    <span className={`rarity-badge ${rarity.className}`}>
      {rarity.name}
    </span>
  );
};

export default RarityBadge;
