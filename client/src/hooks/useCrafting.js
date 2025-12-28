import { useState, useCallback, useEffect } from 'react';
import * as craftingApi from '../api/crafting';
import { useGame } from '../context/GameContext';
import usePolling from './usePolling';

const useCrafting = () => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshBank } = useGame();

  const POLLING_INTERVAL = parseInt(process.env.REACT_APP_POLLING_INTERVAL) || 5000;

  // Fetch active sessions
  const fetchActiveSessions = useCallback(async () => {
    try {
      const response = await craftingApi.getActiveSessions();
      if (response.success) {
        setActiveSessions(response.data.sessions);
      }
    } catch (err) {
      console.error('Failed to fetch active sessions:', err);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchActiveSessions();
  }, [fetchActiveSessions]);

  // Poll for session updates when there are active sessions
  const hasActiveSessions = activeSessions.length > 0;
  const hasInProgressSessions = activeSessions.some(s => s.status === 'active');

  usePolling(fetchActiveSessions, POLLING_INTERVAL, hasActiveSessions && hasInProgressSessions);

  // Start crafting
  const startCrafting = async (componentId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await craftingApi.startCrafting(componentId);

      if (response.success) {
        // Refresh sessions and bank
        await Promise.all([fetchActiveSessions(), refreshBank()]);
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to start crafting';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Collect component
  const collect = async (sessionId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await craftingApi.collectCrafting(sessionId);

      if (response.success) {
        // Refresh bank and sessions
        await Promise.all([refreshBank(), fetchActiveSessions()]);

        return {
          success: true,
          component: response.data.component,
          quantity: response.data.quantity,
        };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to collect component';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cancel session
  const cancel = async (sessionId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await craftingApi.cancelCrafting(sessionId);

      if (response.success) {
        await fetchActiveSessions();
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to cancel session';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    activeSessions,
    loading,
    error,
    startCrafting,
    collect,
    cancel,
    refreshSessions: fetchActiveSessions,
  };
};

export default useCrafting;
