import React from 'react';
import RarityBadge from '../common/RarityBadge';
import './InventoryItem.css';

const InventoryItem = ({ item, type }) => {
  const renderItemDetails = () => {
    switch (type) {
      case 'material':
        return (
          <>
            <div className="item-header">
              <h4 className="item-name">{item.name}</h4>
              <RarityBadge rarityId={item.rarity_id} />
            </div>
            <div className="item-details">
              <span className="item-category">{item.category}</span>
              <span className="item-value">{item.vendor_value} copper</span>
            </div>
          </>
        );

      case 'component':
        return (
          <>
            <div className="item-header">
              <h4 className="item-name">{item.name}</h4>
              <RarityBadge rarityId={item.rarity_id} />
            </div>
            <div className="item-details">
              <span className="item-category">{item.category}</span>
              <span className="item-time">{item.processing_time}s craft time</span>
            </div>
          </>
        );

      case 'item':
        return (
          <>
            <div className="item-header">
              <h4 className="item-name">{item.name}</h4>
              <RarityBadge rarityId={item.rarity_id} />
            </div>
            {item.description && (
              <p className="item-description">{item.description}</p>
            )}
          </>
        );

      case 'tool':
        return (
          <>
            <div className="item-header">
              <h4 className="item-name">{item.name}</h4>
              <span className="tier-badge">Tier {item.tier}</span>
            </div>
            <div className="item-details">
              <span className="item-category">{item.category}</span>
            </div>
          </>
        );

      case 'consumable':
        return (
          <>
            <div className="item-header">
              <h4 className="item-name">{item.name}</h4>
            </div>
            <div className="item-details">
              <span className="item-category">{item.category}</span>
            </div>
          </>
        );

      default:
        return <h4 className="item-name">{item.name}</h4>;
    }
  };

  return (
    <div className="inventory-item">
      <div className="item-content">
        {renderItemDetails()}
      </div>
      <div className="item-quantity">
        <span className="quantity-label">Quantity:</span>
        <span className="quantity-value">{item.quantity}</span>
      </div>
    </div>
  );
};

export default InventoryItem;
