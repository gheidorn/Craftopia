import React, { useState, useEffect } from 'react';
import * as craftingApi from '../api/crafting';
import useCrafting from '../hooks/useCrafting';
import { useNotification } from '../context/NotificationContext';
import ComponentRecipe from '../components/crafting/ComponentRecipe';
import ActiveCraftingSession from '../components/crafting/ActiveCraftingSession';
import Modal from '../components/common/Modal';
import RarityBadge from '../components/common/RarityBadge';
import './CraftingPage.css';

const CraftingPage = () => {
  const [components, setComponents] = useState([]);
  const [activeTab, setActiveTab] = useState('plank');
  const [componentsLoading, setComponentsLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [collectedResults, setCollectedResults] = useState(null);

  const { activeSessions, loading, error, startCrafting, collect, cancel } = useCrafting();
  const { success: notifySuccess, error: notifyError } = useNotification();

  const categories = [
    { id: 'plank', name: 'Planks', icon: '🪵' },
    { id: 'ingot', name: 'Ingots', icon: '⚙️' },
    { id: 'fillet', name: 'Fillets', icon: '🐟' },
    { id: 'extract', name: 'Extracts', icon: '🧪' },
    { id: 'rope', name: 'Rope', icon: '🪢' },
  ];

  // Fetch components
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setComponentsLoading(true);
        const response = await craftingApi.getComponents(activeTab);
        if (response.success) {
          setComponents(response.data.components);
        }
      } catch (err) {
        console.error('Failed to fetch components:', err);
      } finally {
        setComponentsLoading(false);
      }
    };

    fetchComponents();
  }, [activeTab]);

  const handleCraft = async (componentId) => {
    const result = await startCrafting(componentId);

    if (result.success) {
      notifySuccess(`Started crafting ${result.component?.name || 'component'}!`);
    } else if (result.error) {
      notifyError(result.error);
    }
  };

  const handleCollect = async (sessionId) => {
    const result = await collect(sessionId);

    if (result.success) {
      setCollectedResults(result);
      setShowResultsModal(true);
      notifySuccess(`Collected ${result.quantity}x ${result.component.name}!`);
    } else if (result.error) {
      notifyError(result.error);
    }
  };

  const handleCancel = async (sessionId) => {
    if (window.confirm('Are you sure? Materials will not be refunded.')) {
      const result = await cancel(sessionId);

      if (result.success) {
        notifySuccess('Crafting session cancelled.');
      } else if (result.error) {
        notifyError(result.error);
      }
    }
  };

  const closeResultsModal = () => {
    setShowResultsModal(false);
    setCollectedResults(null);
  };

  const filteredComponents = components.filter(c => c.category === activeTab);

  return (
    <div className="page crafting-page">
      <div className="container">
        <h2 className="page-title">Crafting</h2>

        {error && (
          <div className="error" style={{ marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {/* Active Crafting Sessions */}
        {activeSessions.length > 0 && (
          <div className="active-sessions-section">
            <h3>Active Crafting Sessions</h3>
            <div className="active-sessions-grid">
              {activeSessions.map((session) => (
                <ActiveCraftingSession
                  key={session.id}
                  session={session}
                  onCollect={handleCollect}
                  onCancel={handleCancel}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        )}

        {/* Component Recipes */}
        <div className="recipes-section">
          <h3>Component Recipes</h3>

          <div className="category-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`tab-button ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="tab-content">
            {componentsLoading ? (
              <div className="loading">Loading recipes...</div>
            ) : filteredComponents.length === 0 ? (
              <p className="empty-message">No components in this category.</p>
            ) : (
              <div className="recipes-grid">
                {filteredComponents.map((component) => (
                  <ComponentRecipe
                    key={component.id}
                    component={component}
                    onCraft={handleCraft}
                    loading={loading}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Modal */}
        <Modal
          isOpen={showResultsModal}
          onClose={closeResultsModal}
          title="Crafting Complete!"
        >
          {collectedResults && (
            <div className="crafting-results">
              <div className="results-icon">✨</div>
              <h4 className="results-title">You crafted:</h4>
              <div className="results-item">
                <div className="results-quantity">{collectedResults.quantity}x</div>
                <div className="results-component">
                  <span className="component-name">{collectedResults.component.name}</span>
                  <RarityBadge rarityId={collectedResults.component.rarity_id} />
                </div>
              </div>
              <div className="results-details">
                <div className="detail">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{collectedResults.component.category}</span>
                </div>
                <div className="detail">
                  <span className="detail-label">Processing Time:</span>
                  <span className="detail-value">{collectedResults.component.processing_time}s</span>
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

export default CraftingPage;
