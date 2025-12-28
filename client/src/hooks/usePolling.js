import { useEffect, useRef } from 'react';

/**
 * Custom hook for polling - executes a callback at regular intervals
 * @param {Function} callback - Function to execute on each interval
 * @param {number} interval - Interval in milliseconds (default: 5000)
 * @param {boolean} enabled - Whether polling is enabled (default: true)
 */
const usePolling = (callback, interval = 5000, enabled = true) => {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const id = setInterval(tick, interval);

    return () => clearInterval(id);
  }, [interval, enabled]);
};

export default usePolling;
