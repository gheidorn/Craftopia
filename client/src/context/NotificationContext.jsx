import React, { createContext, useContext, useState, useCallback } from 'react';
import './NotificationContext.css';

const NotificationContext = createContext(null);

let notificationId = 0;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, message, duration = 5000) => {
    const id = notificationId++;

    const notification = {
      id,
      type, // 'success', 'error', 'info', 'warning'
      message,
    };

    setNotifications((prev) => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const success = useCallback((message, duration) => {
    return addNotification('success', message, duration);
  }, [addNotification]);

  const error = useCallback((message, duration) => {
    return addNotification('error', message, duration);
  }, [addNotification]);

  const info = useCallback((message, duration) => {
    return addNotification('info', message, duration);
  }, [addNotification]);

  const warning = useCallback((message, duration) => {
    return addNotification('warning', message, duration);
  }, [addNotification]);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={() => onRemove(notification.id)}
        />
      ))}
    </div>
  );
};

const Notification = ({ notification, onRemove }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`notification notification-${notification.type}`}>
      <div className="notification-icon">{getIcon()}</div>
      <div className="notification-message">{notification.message}</div>
      <button className="notification-close" onClick={onRemove}>
        ×
      </button>
    </div>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
