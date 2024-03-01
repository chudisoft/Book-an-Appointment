import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const login = createAsyncThunk('login', async (userData) => {
  try {
    const result = await axios.post('http://localhost:3000/api/v1/login', { user: { ...userData } });
    return result.data;
  } catch (error) {
    console.log("error");
    console.log(error.response.data);
    return error.response.data;
  }
});

const signup = createAsyncThunk('signupUser', async (newUserData) => {
  try {
    const result = await axios.post('http://localhost:3000/api/v1/signup', { user: { ...newUserData } });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
});

const cUser = JSON.parse(localStorage.getItem('currentUser'))

const userSlice = createSlice({
  name: 'user',
  initialState: {
    icon: 'bars',
    currentUser: cUser || null,
    isLoading: false,
    success: false,
    error: false,
    information: '',
    requestHeader: { headers: { Authorization: `Bearer ${cUser?.token}`, 'Content-Type': 'application/json' } },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.information = 'Created Your Account';
        if (action.payload?.error) {
          state.error = true;
          state.success = false;
        } else if (action.payload?.name) {
          state.success = true;
          toast.success("Login was successfull");
          state.currentUser = action.payload;
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
          state.message = action.payload.message;
          state.requestHeader = { headers: { Authorization: `Bearer ${action.payload.token}`, 'Content-Type': 'application/json' } };
          
        } else {
          state.success = true;
          state.error = false;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.isLoading = false;
        if (action.payload?.error) {
          state.error = true;
          toast.error(action.payload.message);
        } else if (action.payload?.name) {
          state.success = true;
          toast.success("Login was successfull");
          state.currentUser = action.payload;
          localStorage.setItem('currentUser', JSON.stringify(action.payload));
          state.message = action.payload.message;
          state.requestHeader = { headers: { Authorization: `Bearer ${action.payload.token}`, 'Content-Type': 'application/json' } };
          
        } else {
          toast.error(action.payload);
          console.log(action.payload);
        }
      });
  },
});

export const { requestHeader } = userSlice.actions;
export default userSlice.reducer;
export { login, signup };
