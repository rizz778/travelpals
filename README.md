# TravelPals 🌍🚆 | Real-Time Location-Based Social and Chat Platform

## Overview 📝
TravelPals is a platform designed for students to find travel companions based on their nearest metro station and area. It utilizes **OpenStreetMap API** for real-time geolocation and provides a seamless chat experience using **Socket.IO**.

## Features 🚀
- 📍 **Real-Time Location Sharing**: Users can view nearby students' locations based on metro stations.
- 🗂️ **Profile Viewing**: Click on a location to see a student's profile.
- 💬 **Instant Messaging**: Real-time chat functionality using WebSockets.
- 🔔 **Notifications**: Get notified when you receive a new message.

## Tech Stack 🛠️
- **Frontend**: React.js ⚛️
- **Backend**: Node.js 🟢, Express.js 🚀
- **Database**: MongoDB 🍃
- **Geolocation**: OpenStreetMap API 🗺️
- **Real-Time Communication**: Socket.IO 🔄

---

## API Endpoints 🌐

### **Authentication**
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Log in an existing user.

### **User**
- **GET** `/api/user` - Get authenticated user details.
- **PUT** `/api/user/location` - Update user location using OpenStreetMap API.

### **Travel Pals**
- **GET** `/api/travelpals` - Find nearby travel companions.
- **POST** `/api/travelpals/chat` - Initiate a real-time chat with a travel companion.

### **Chat**
- **GET** `/api/chat/:id` - Fetch chat history.
- **POST** `/api/chat/message` - Send a real-time message using Socket.IO.

---

---

## Installation 🏗️

### **Prerequisites 🛠️**
Ensure you have the following installed:
- Node.js 🌐
- MongoDB 🍃

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rizz778/travelpals.git

2. **Install Dependencies**:
   For the backend:
   ```bash
   cd backend
   npm install
   
   For the frontend:
   ```bash
   cd frontend
   npm install
3. **Set up environment variables**:
   Create a .env file in the backend directory and add the following:
   ```bash
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   SOCKET_PORT=8080
   
4. **Run the backend server:**:
   ```bash
   cd backend
   npm start
5. **Run the frontend development server:**:
   ```bash
   cd frontend
   npm run dev

  

