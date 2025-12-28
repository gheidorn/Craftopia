import React, { useState } from 'react';
import useBank from '../hooks/useBank';
import InventoryItem from '../components/bank/InventoryItem';
import './BankPage.css';

const BankPage = () => {
  const { materials, components, items, tools, consumables, summary, loading, error } = useBank();
  const [activeTab, setActiveTab] = useState('materials');

  if (loading) {
    return (
      <div className="page bank-page">
        <div className="container">
          <div className="loading">Loading bank...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page bank-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'materials':
        return (
          <div className="inventory-grid">
            {materials.length === 0 ? (
              <p className="empty-message">No materials in bank. Start farming to collect materials!</p>
            ) : (
              materials.map((material) => (
                <InventoryItem key={material.id} item={material} type="material" />
              ))
            )}
          </div>
        );

      case 'components':
        return (
          <div className="inventory-grid">
            {components.length === 0 ? (
              <p className="empty-message">No components in bank. Craft components from your materials!</p>
            ) : (
              components.map((component) => (
                <InventoryItem key={component.id} item={component} type="component" />
              ))
            )}
          </div>
        );

      case 'items':
        return (
          <div className="inventory-grid">
            {items.length === 0 ? (
              <p className="empty-message">No items in bank. Items system coming soon!</p>
            ) : (
              items.map((item) => (
                <InventoryItem key={item.id} item={item} type="item" />
              ))
            )}
          </div>
        );

      case 'tools':
        return (
          <div className="inventory-grid">
            {tools.length === 0 ? (
              <p className="empty-message">No tools in bank.</p>
            ) : (
              tools.map((tool) => (
                <InventoryItem key={tool.id} item={tool} type="tool" />
              ))
            )}
          </div>
        );

      case 'consumables':
        return (
          <div className="inventory-grid">
            {consumables.length === 0 ? (
              <p className="empty-message">No consumables in bank.</p>
            ) : (
              consumables.map((consumable) => (
                <InventoryItem key={consumable.id} item={consumable} type="consumable" />
              ))
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page bank-page">
      <div className="container">
        <div className="page-header">
          <h2 className="page-title">Bank</h2>
          {summary && (
            <div className="bank-summary">
              <div className="summary-item">
                <span className="summary-label">Materials:</span>
                <span className="summary-value">{summary.total_materials}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Components:</span>
                <span className="summary-value">{summary.total_components}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Items:</span>
                <span className="summary-value">{summary.total_items}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Value:</span>
                <span className="summary-value gold">{summary.total_value} copper</span>
              </div>
            </div>
          )}
        </div>

        <div className="bank-tabs">
          <button
            className={`tab-button ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            Materials ({materials.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'components' ? 'active' : ''}`}
            onClick={() => setActiveTab('components')}
          >
            Components ({components.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            Items ({items.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => setActiveTab('tools')}
          >
            Tools ({tools.length})
          </button>
          <button
            className={`tab-button ${activeTab === 'consumables' ? 'active' : ''}`}
            onClick={() => setActiveTab('consumables')}
          >
            Consumables ({consumables.length})
          </button>
        </div>

        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default BankPage;
