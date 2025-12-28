import React, { useState } from 'react';
import useFarming from '../hooks/useFarming';
import { useNotification } from '../context/NotificationContext';
import FarmingStation from '../components/farming/FarmingStation';
import ActiveSession from '../components/farming/ActiveSession';
import Modal from '../components/common/Modal';
import RarityBadge from '../components/common/RarityBadge';
import './FarmingPage.css';

const FarmingPage = () => {
  const { activeSession, loading, error, startFarming, collect, cancel, isReady } = useFarming();
  const { success: notifySuccess, error: notifyError } = useNotification();
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [collectedResults, setCollectedResults] = useState(null);

  const handleStartFarming = async (category, duration) => {
    const result = await startFarming(category, duration);

    if (result.success) {
      notifySuccess(`Started farming ${category} for ${duration} minute${duration > 1 ? 's' : ''}!`);
    } else if (result.error) {
      notifyError(result.error);
    }
  };

  const handleCollect = async () => {
    const result = await collect();

    if (result.success) {
      setCollectedResults(result);
      setShowResultsModal(true);
      notifySuccess(`Collected ${result.quantity}x ${result.material.name}!`);
    } else if (result.error) {
      notifyError(result.error);
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this farming session?')) {
      const result = await cancel();

      if (result.success) {
        notifySuccess('Farming session cancelled');
      } else if (result.error) {
        notifyError(result.error);
      }
    }
  };

  const closeResultsModal = () => {
    setShowResultsModal(false);
    setCollectedResults(null);
  };

  return (
    <div className="page farming-page">
      <div className="container">
        <h2 className="page-title">Farming</h2>

        {error && (
          <div className="error" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {activeSession ? (
          <ActiveSession
            session={activeSession}
            onCollect={handleCollect}
            onCancel={handleCancel}
            isReady={isReady}
            loading={loading}
          />
        ) : (
          <FarmingStation onStart={handleStartFarming} loading={loading} />
        )}

        {/* Results Modal */}
        <Modal
          isOpen={showResultsModal}
          onClose={closeResultsModal}
          title="Farming Complete!"
        >
          {collectedResults && (
            <div className="farming-results">
              <div className="results-icon">✨</div>
              <h4 className="results-title">You collected:</h4>
              <div className="results-item">
                <div className="results-quantity">{collectedResults.quantity}x</div>
                <div className="results-material">
                  <span className="material-name">{collectedResults.material.name}</span>
                  <RarityBadge rarityId={collectedResults.material.rarity_id} />
                </div>
              </div>
              <div className="results-details">
                <div className="detail">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{collectedResults.material.category}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Vendor Value:</span>
                  <span className="detail-value gold">
                    {collectedResults.material.vendor_value * collectedResults.quantity} copper
                  </span>
                </div>
              </div>
              <button
                className="button button-primary"
                onClick={closeResultsModal}
                style={{ width: '100%', marginTop: '1.5rem' }}
              >
                Great!
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FarmingPage;
