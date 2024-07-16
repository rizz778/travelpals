import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes  from './routes/chatRoutes.js';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import { saveMessage } from './controllers/chatController.js';
import { getUserName } from './controllers/userController.js';
// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // Add user routes
app.use('/api/chat', chatRoutes); // Add chat routes

// Serve static files (profile images)
app.use('/profileImages', express.static('upload/profileImages'));

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Start the server
const appServer = server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server errors
appServer.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Store connected users
const users = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // When a user joins, store their ID
  socket.on('join', ({ userId }) => {
    users[userId] = socket.id;
  });
  socket.on('private_message', async (message) => {
    const { user, recipient, text } = message;
    console.log('Received private message:', message);
    
    if (!user || !recipient || !text) {
      console.error('Missing required fields in message:', message);
      return;
    }
    try{ 
      console.log('Saving message:', { sender: user, recipient, text });
      // Save message to database
       await saveMessage(user, recipient, text);
       const recipientSocketId = users[recipient];
    if (recipientSocketId) {
      
      // Send the message to the recipient
      io.to(recipientSocketId).emit('private_message', { user, text, status: 'received' });
      
    }
    // Send the message to the sender
    io.to(socket.id).emit('private_message', { user, text, status: 'sent' });
     
     // Get the sender's name
     const senderName = await getUserName(user);

    // Emit notification to the recipient
    io.to(recipientSocketId).emit('new_notification',  { from: user, fromName: senderName, text });
  } catch(error){
    console.error('Error handling private message:', error);
  }
  });
  

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove the user from the list
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});
