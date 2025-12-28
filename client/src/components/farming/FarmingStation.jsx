import React, { useState } from 'react';
import './FarmingStation.css';

const FarmingStation = ({ onStart, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState('wood');
  const [duration, setDuration] = useState(5);

  const categories = [
    { id: 'wood', name: 'Wood', icon: '🌲', description: 'Gather wood materials' },
    { id: 'metal', name: 'Metal', icon: '⛏️', description: 'Mine metal ores' },
    { id: 'fish', name: 'Fish', icon: '🐟', description: 'Catch fish' },
    { id: 'herb', name: 'Herb', icon: '🌿', description: 'Harvest herbs' },
  ];

  const durationOptions = [1, 5, 10, 15, 30, 60];

  const handleStart = () => {
    onStart(selectedCategory, duration);
  };

  return (
    <div className="farming-station card">
      <h3>Start Farming</h3>

      <div className="category-selection">
        <label>Select Material Category:</label>
        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              disabled={loading}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-description">{category.description}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="duration-selection">
        <label>Duration:</label>
        <div className="duration-buttons">
          {durationOptions.map((min) => (
            <button
              key={min}
              className={`duration-button ${duration === min ? 'selected' : ''}`}
              onClick={() => setDuration(min)}
              disabled={loading}
            >
              {min} min
            </button>
          ))}
        </div>
      </div>

      <button
        className="button button-primary start-button"
        onClick={handleStart}
        disabled={loading}
      >
        {loading ? 'Starting...' : 'Start Farming'}
      </button>

      <div className="farming-info">
        <p>
          <strong>How it works:</strong> Select a material category and duration, then wait
          for the farming session to complete. The rarity of materials you receive is based
          on spawn chances: Common (60%), Uncommon (25%), Rare (10%), Epic (4%), Legendary (1%).
        </p>
      </div>
    </div>
  );
};

export default FarmingStation;
