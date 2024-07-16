import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatHistory, addMessage } from '../redux/chatSlice';

import socket from '../utils/socket';
import './Chat.css';

const Chat = ({ user, recipient, recipientProfile }) => {
  const dispatch=useDispatch();
  const { messages, status } = useSelector(state => state.chat);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('Logged In User ID:', user);
    console.log('Recipient ID:', recipient);
    dispatch(fetchChatHistory({ recipientId: recipient }));
    if (user) {
      socket.emit('join', { userId: user});
  
      socket.on('private_message', (message) => {
        dispatch(addMessage(message));
      });
  
      return () => {
        socket.off('private_message');
      };
    }
  }, [dispatch,user, recipient]);
  
  

  const sendMessage =async () => {
    const message = {
      user,
      recipient,
      text: input,
    };
    
    socket.emit('private_message',{ ...message, user });
    
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={recipientProfile.profile} alt={`${recipientProfile.name}'s profile`} className="profile-image" />
        <div className="profile-info">
          <h2>{recipientProfile.name}</h2>
          <p>{recipientProfile.college}</p>
        </div>
      </div>
      <div className="chat-messages">
        {status==='loading'?(
          <p>Loading...</p>
        ):(
        messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.status === 'sent' ? 'chat-message-sent' : 'chat-message-received'}`}
          >
            <strong>{msg.status === 'sent' ? 'You' : recipientProfile.name}:</strong> {msg.text}
          </div>
        ))
      )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send-button">Send</button>
      </div>
    </div>
  );
};

export default Chat;
