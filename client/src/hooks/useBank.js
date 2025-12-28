import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const useBank = () => {
  const { bank, summary, loading, error, refreshBank, getItemQuantity, hasItem } = useGame();

  useEffect(() => {
    refreshBank();
  }, [refreshBank]);

  return {
    materials: bank.materials,
    components: bank.components,
    items: bank.items,
    tools: bank.tools,
    consumables: bank.consumables,
    summary,
    loading,
    error,
    refreshBank,
    getItemQuantity,
    hasItem,
  };
};

export default useBank;
