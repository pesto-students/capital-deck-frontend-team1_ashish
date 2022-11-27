/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  mydata: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Get Me
export const getUser = createAsyncThunk('users/getuser', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await userService.getUser(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update User
export const updateUser = createAsyncThunk('users/updateuser', async (data, thunkAPI) => {
  const { id, ...fields } = data;
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await userService.updateUser(token, id, fields);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mydata = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mydata = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
