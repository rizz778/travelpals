import React from 'react';
import logo from '../Assests/logo.png';
import { Link } from 'react-router-dom';
import './Home.css';
import location from '../Assests/home-location.png';
import notif from '../Assests/home-notif.png';
import chat from '../Assests/home-chat.png';
import user from '../Assests/home-user.png';

function Home() {
  return (
    <>
      <div className='weblogo'>
        <img src={logo} alt="Logo" />
      </div>
      <div className="content">
        <div className="para">
          <p>TravelPals is an innovative platform designed to connect students based on their geographic proximity, using their nearest metro station and area as reference points. The application is built with the following key features:</p>
          <div className='content-images'>
            <img src={location} alt="Location" />
          </div>
        </div>
        <div className="para">
          <p>Utilizes the OpenStreetMap API to convert user locations into coordinates. Displays a map with pointers representing nearby students. Users can click on a pointer to view detailed profiles of nearby students.</p>
          <div className='content-images'>
            <img src={user} alt="User" />
          </div>
        </div>
        <div className="para">
          <p>Each user profile includes personal information such as name, profile picture, and college details. Profiles are accessible by clicking on the location pointers on the map.</p>
          <div className='content-images'>
            <img src={chat} alt="Chat" />
          </div>
        </div>
        <div className="para">
          <p>Integrated chat application allowing users to initiate and maintain conversations. Messages are saved in a manner that distinguishes between 'sent' and 'received' statuses. Real-time message updates via Socket.IO.</p>
          <div className='content-images'>
            <img src={notif} alt="Notification" />
          </div>
        </div>
        <div className="para">
          <p>Users receive notifications when they get a new message. Notifications include the sender's name and a prompt indicating that they have sent a message. Clicking on the notification opens the chat window with the sender.</p>
          <Link to='/register'><button className='btn'>Get Started</button></Link>
        </div>
      </div>
    </>
  );
}

export default Home;
