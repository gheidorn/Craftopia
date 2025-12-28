import React from 'react';
import Timer from '../common/Timer';
import RarityBadge from '../common/RarityBadge';
import './ActiveSession.css';

const ActiveSession = ({ session, onCollect, onCancel, isReady, loading }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      wood: '🌲',
      metal: '⛏️',
      fish: '🐟',
      herb: '🌿',
    };
    return icons[category] || '📦';
  };

  const getCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="active-session card">
      <h3>
        <span className="session-icon">{getCategoryIcon(session.materialCategory)}</span>
        Active Farming Session
      </h3>

      <div className="session-details">
        <div className="detail-item">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{getCategoryName(session.materialCategory)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Duration:</span>
          <span className="detail-value">{Math.floor(session.durationSeconds / 60)} minutes</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className={`status-badge ${session.status}`}>
            {session.status === 'ready' ? 'Ready to Collect' : 'In Progress'}
          </span>
        </div>
      </div>

      {!isReady && session.readyAt && (
        <Timer targetDate={session.readyAt} onComplete={() => {}} />
      )}

      {isReady && (
        <div className="ready-message">
          <p className="success">✨ Your materials are ready to collect!</p>
        </div>
      )}

      <div className="session-actions">
        {isReady ? (
          <button
            className="button button-primary"
            onClick={onCollect}
            disabled={loading}
          >
            {loading ? 'Collecting...' : 'Collect Materials'}
          </button>
        ) : (
          <button
            className="button button-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel Session'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveSession;
