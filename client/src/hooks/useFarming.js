import { useState, useCallback, useEffect } from 'react';
import * as farmingApi from '../api/farming';
import { useGame } from '../context/GameContext';
import usePolling from './usePolling';

const useFarming = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshBank } = useGame();

  const POLLING_INTERVAL = parseInt(process.env.REACT_APP_POLLING_INTERVAL) || 5000;

  // Fetch active session
  const fetchActiveSession = useCallback(async () => {
    try {
      const response = await farmingApi.getActiveSession();
      if (response.success) {
        setActiveSession(response.data.session);
      }
    } catch (err) {
      console.error('Failed to fetch active session:', err);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchActiveSession();
  }, [fetchActiveSession]);

  // Poll for session updates when there's an active session
  usePolling(
    fetchActiveSession,
    POLLING_INTERVAL,
    activeSession !== null && activeSession?.status === 'active'
  );

  // Start farming
  const startFarming = async (materialCategory, durationMinutes) => {
    try {
      setLoading(true);
      setError(null);

      const response = await farmingApi.startFarming(materialCategory, durationMinutes);

      if (response.success) {
        setActiveSession(response.data.session);
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to start farming';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Collect materials
  const collect = async () => {
    if (!activeSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setLoading(true);
      setError(null);

      const response = await farmingApi.collectFarming(activeSession.id);

      if (response.success) {
        // Refresh bank to show new materials
        await refreshBank();

        // Clear active session
        setActiveSession(null);

        return {
          success: true,
          material: response.data.material,
          quantity: response.data.quantity,
        };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to collect materials';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cancel session
  const cancel = async () => {
    if (!activeSession) {
      return { success: false, error: 'No active session' };
    }

    try {
      setLoading(true);
      setError(null);

      const response = await farmingApi.cancelFarming(activeSession.id);

      if (response.success) {
        setActiveSession(null);
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

  // Check if session is ready
  const isReady = activeSession?.status === 'ready' || activeSession?.timeRemaining === 0;

  return {
    activeSession,
    loading,
    error,
    startFarming,
    collect,
    cancel,
    isReady,
    refreshSession: fetchActiveSession,
  };
};

export default useFarming;
