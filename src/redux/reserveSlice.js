import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const addReservation = createAsyncThunk('create reservation', async (motorcycleData, { getState }) => {
  try {
    const myToken = getState().user.currentUser.token;
    const result = await axios.post('http://localhost:3000/api/v1/reservations', motorcycleData,
      {
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
      });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
});

const getUserReservations = createAsyncThunk('getUserReservations', async (_, { getState }) => {
  try {
    const myToken = getState().user.currentUser.token;
    const result = await axios.get('http://localhost:3000/api/v1/reservations', {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
});

const reserveSlice = createSlice({
  name: 'reserve',
  initialState: {
    reserves: [],
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReservation.fulfilled, (state, action) => {
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(addReservation.rejected, (state, action) => {
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.reserves = action.payload.data;
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.message = action.payload.message;
        toast.error(action.payload.message);
      });
  },
});

export default reserveSlice.reducer;
export { addReservation, getUserReservations };
