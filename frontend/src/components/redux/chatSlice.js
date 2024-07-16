import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching chat history
export const fetchChatHistory = createAsyncThunk('chat/fetchChatHistory', async ({ recipientId }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:4000/api/chat/${recipientId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setRecipient: (state, action) => {
      state.recipient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.errors || action.error.message;
      });
  },
});

export const { addMessage ,setRecipient } = chatSlice.actions;
export default chatSlice.reducer;