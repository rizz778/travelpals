import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching nearby students
export const fetchNearbyStudents = createAsyncThunk('users/fetchNearbyStudents', async (metro, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/nearby-students/${metro}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby students:', error.response.data);
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    usersByMetro: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNearbyStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersByMetro = action.payload;
      })
      .addCase(fetchNearbyStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.errors || action.error.message;
      });
  },
});

export default userSlice.reducer;
