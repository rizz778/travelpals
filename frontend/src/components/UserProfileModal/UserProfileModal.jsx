import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './UserProfileModal.css'
const UserProfileModal = ({ isOpen, onClose, user ,loggedInUser}) => {
  if (!user || !loggedInUser) return null;
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate(`/chat/${loggedInUser._id}/${user._id}`, { state: { recipientProfile: user } });
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Profile"
      ariaHideApp={false}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <div className="modal-header">
        <h2>{user.name}'s Profile</h2>
        
      </div>
      <div className="modal-body">
        <p><strong>College:</strong> {user.college}</p>
        <p><strong>Address:</strong> {user.metro.name}</p>
      </div>
      <div className="modal-footer"> 
        
       
        <button onClick={handleChatClick}>Chat</button>
      </div>

    </Modal>
  );
};


export default UserProfileModal;

