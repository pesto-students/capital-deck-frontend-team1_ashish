import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import alertService from './alertService';

const initialState = {
  alerts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create new alert
export const createAlert = createAsyncThunk('alerts/create', async (alertData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await alertService.createAlert(alertData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user alerts
export const getAlerts = createAsyncThunk('alerts/getAll', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await alertService.getAlerts(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user alert
export const deleteAlert = createAsyncThunk('alerts/delete', async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await alertService.deleteAlert(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAlert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.alerts.push(action.payload);
      })
      .addCase(createAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAlerts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlerts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.alerts = action.payload;
      })
      .addCase(getAlerts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAlert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAlert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.alerts = state.alerts.filter((alert) => alert._id !== action.payload.id);
      })
      .addCase(deleteAlert.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = alertSlice.actions;
export default alertSlice.reducer;
