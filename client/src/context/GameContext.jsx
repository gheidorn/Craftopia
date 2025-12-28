import React, { createContext, useContext, useState, useCallback } from 'react';
import * as bankApi from '../api/bank';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [bank, setBank] = useState({
    materials: [],
    components: [],
    items: [],
    tools: [],
    consumables: [],
  });

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refresh bank data from server
  const refreshBank = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await bankApi.getBank();

      if (response.success) {
        setBank(response.data.inventory);
        setSummary(response.data.summary);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to load bank';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get specific item quantity
  const getItemQuantity = useCallback((itemType, itemId) => {
    const items = bank[itemType + 's'] || [];
    const item = items.find(i => {
      const idField = itemType + '_id';
      return i[idField] === itemId;
    });
    return item ? item.quantity : 0;
  }, [bank]);

  // Check if user has item with sufficient quantity
  const hasItem = useCallback((itemType, itemId, requiredQuantity = 1) => {
    const quantity = getItemQuantity(itemType, itemId);
    return quantity >= requiredQuantity;
  }, [getItemQuantity]);

  const value = {
    bank,
    summary,
    loading,
    error,
    refreshBank,
    getItemQuantity,
    hasItem,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
