import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ targetDate, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = Math.max(0, Math.floor((target - now) / 1000));
      return diff;
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining === 0 && onComplete) {
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }

    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }

    return `${secs}s`;
  };

  const getProgressPercentage = () => {
    // This is a simple timer, we don't have start time
    // For progress bar, parent should pass totalDuration
    return 0;
  };

  return (
    <div className="timer">
      <div className="timer-display">
        <span className="timer-label">Time Remaining:</span>
        <span className="timer-value">{formatTime(timeRemaining)}</span>
      </div>
      {timeRemaining === 0 && (
        <div className="timer-complete">Ready to collect!</div>
      )}
    </div>
  );
};

export default Timer;
