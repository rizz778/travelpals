// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import chatReducer from '../redux/chatSlice'
import notificationsReducer from '../redux/notificationsSlice';
const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    chat:chatReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
  devTools: isDevelopment,
});

export default store;

