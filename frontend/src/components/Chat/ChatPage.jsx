import React from 'react';
import Chat from '../Chat/Chat';
import { useParams,useLocation } from 'react-router-dom';

const ChatPage = () => {
  const { loggedInUserId, recipientId } = useParams();
  const location = useLocation();
  const recipientProfile = location.state.recipientProfile;
  return (
    <div>
      
      <Chat user={loggedInUserId} recipient={recipientId} recipientProfile={recipientProfile}/>
    </div>
  );
};

export default ChatPage;
