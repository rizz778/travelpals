import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../utils/socket';
import { addNotification, clearNotifications } from '../redux/notificationsSlice';
import { setRecipient } from '../redux/chatSlice'; // Assuming you have an action to set the recipient
const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notifications.notifications);

  useEffect(() => {
    socket.on('new_notification', (notification) => {
      dispatch(addNotification(notification));
    });

    return () => {
      socket.off('new_notification');
    };
  }, [dispatch]);
  const handleNotificationClick = (from) => {
    dispatch(setRecipient(from)); // Set the recipient in the chat slice
    // Additional logic to open the chat window if needed
  };
  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} onClick={() => handleNotificationClick(notification.from)}>
              <strong>{notification.fromName}</strong> has sent you a message.
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => dispatch(clearNotifications())}>Clear Notifications</button>
    </div>
  );
};

export default Notifications;
