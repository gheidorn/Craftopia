import React, { useState, useEffect } from 'react';
import * as craftingApi from '../../api/crafting';
import RarityBadge from '../common/RarityBadge';
import './ComponentRecipe.css';

const ComponentRecipe = ({ component, onCraft, loading }) => {
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setDetailsLoading(true);
        const response = await craftingApi.getComponentDetails(component.id);
        if (response.success) {
          setDetails(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch component details:', err);
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchDetails();
  }, [component.id]);

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${minutes}m ${secs}s` : `${minutes}m`;
  };

  if (detailsLoading) {
    return (
      <div className="component-recipe card">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!details) {
    return null;
  }

  const { requirements, canCraft, missing } = details;

  return (
    <div className={`component-recipe card ${!canCraft ? 'disabled' : ''}`}>
      <div className="recipe-header">
        <div className="recipe-title">
          <h4>{component.name}</h4>
          <RarityBadge rarityId={component.rarity_id} />
        </div>
        <div className="recipe-time">
          <span className="time-icon">⏱️</span>
          <span>{formatTime(component.processing_time)}</span>
        </div>
      </div>

      <div className="recipe-requirements">
        <div className="requirement-section">
          <h5>Materials</h5>
          <ul>
            {requirements.materials.map((material, index) => {
              const isMissing = missing.find(m => m.type === 'material' && m.name === material.name);
              return (
                <li key={index} className={isMissing ? 'missing' : ''}>
                  <span className="req-name">{material.name}</span>
                  <span className="req-quantity">
                    {isMissing ? `${isMissing.current}/${material.quantity}` : `${material.quantity}x`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {requirements.tools.length > 0 && (
          <div className="requirement-section">
            <h5>Tools</h5>
            <ul>
              {requirements.tools.map((tool, index) => {
                const isMissing = missing.find(m => m.type === 'tool' && m.name === tool.name);
                return (
                  <li key={index} className={isMissing ? 'missing' : ''}>
                    <span className="req-name">{tool.name}</span>
                    <span className="req-quantity">{tool.quantity}x</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {requirements.consumables.length > 0 && (
          <div className="requirement-section">
            <h5>Consumables</h5>
            <ul>
              {requirements.consumables.map((consumable, index) => {
                const isMissing = missing.find(m => m.type === 'consumable' && m.name === consumable.name);
                return (
                  <li key={index} className={isMissing ? 'missing' : ''}>
                    <span className="req-name">{consumable.name}</span>
                    <span className="req-quantity">
                      {isMissing ? `${isMissing.current}/${consumable.quantity}` : `${consumable.quantity}x`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {!canCraft && missing.length > 0 && (
        <div className="missing-notice">
          Missing: {missing.map(m => m.name).join(', ')}
        </div>
      )}

      <button
        className="button button-primary craft-button"
        onClick={() => onCraft(component.id)}
        disabled={!canCraft || loading}
      >
        {loading ? 'Crafting...' : canCraft ? 'Craft' : 'Insufficient Materials'}
      </button>
    </div>
  );
};

export default ComponentRecipe;
