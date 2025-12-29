import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showToast = (message, type = 'simple') => {
        setNotification({ message, type });
        // 3 soniyadan keyin o'chadi
        setTimeout(() => setNotification(null), 3500);
    };

    return (
        <NotificationContext.Provider value={{ showToast }}>
            {children}
            {notification && <Toast message={notification.message} type={notification.type} />}
        </NotificationContext.Provider>
    );
};

// Toast Componenti (Ichki foydalanish uchun)
const Toast = ({ message, type }) => {
    return (
        <div className={`toast-container slide-down ${type}`}>
            <div className="toast-content">
                {type === 'match' && <span className="toast-icon">❤️</span>}
                <p>{message}</p>
            </div>
            <div className="toast-progress"></div>
        </div>
    );
};

export const useNotification = () => useContext(NotificationContext);