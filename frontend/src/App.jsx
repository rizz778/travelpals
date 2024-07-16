// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import  Login  from './components/Login/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import MetroMap from './components/Map/MetroMap';
import ChatPage from './components/Chat/ChatPage';
import Notifications from './components/notif/Notifications';
function App() {
  const [coordinates, setCoordinates] = useState([77.2090, 28.6139]);

  const handleLocationSelect = (coords) => {
    setCoordinates(coords);
  };

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/metromap' element={<MetroMap/>}/>
      <Route path="/chat/:loggedInUserId/:recipientId"  element={<ChatPage/>}/>
      <Route path='/notification' element={<Notifications/>}/>
    </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;

