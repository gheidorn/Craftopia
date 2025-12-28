import React from 'react';
import Timer from '../common/Timer';
import RarityBadge from '../common/RarityBadge';
import './ActiveCraftingSession.css';

const ActiveCraftingSession = ({ session, onCollect, onCancel, loading }) => {
  const isReady = session.status === 'ready' || session.timeRemaining === 0;

  return (
    <div className="active-crafting-session card">
      <div className="session-header">
        <div className="session-title">
          <h4>{session.component_name}</h4>
          <RarityBadge rarityId={session.component_rarity} />
        </div>
        <div className={`status-badge ${session.status}`}>
          {session.status === 'ready' ? 'Ready' : 'Crafting'}
        </div>
      </div>

      <div className="session-details">
        <div className="detail-item">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{session.component_category}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Quantity:</span>
          <span className="detail-value">{session.result_quantity}x</span>
        </div>
      </div>

      {!isReady && session.ready_at && (
        <Timer targetDate={session.ready_at} onComplete={() => {}} />
      )}

      {isReady && (
        <div className="ready-message">
          <p className="success">✨ Your component is ready!</p>
        </div>
      )}

      <div className="session-actions">
        {isReady ? (
          <button
            className="button button-primary"
            onClick={() => onCollect(session.id)}
            disabled={loading}
          >
            {loading ? 'Collecting...' : 'Collect Component'}
          </button>
        ) : (
          <button
            className="button button-secondary"
            onClick={() => onCancel(session.id)}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Cancel (No Refund)'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveCraftingSession;
