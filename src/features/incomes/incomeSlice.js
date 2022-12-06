/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import incomeService from './incomeService';

const initialState = {
  incomes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create new Income
export const createIncome = createAsyncThunk('incomes/create', async (incomeData, thunkAPI) => {
  const { date, name, amount, categoryid, file } = incomeData;

  const formdata = new FormData();
  formdata.append('incomedate', date);
  formdata.append('incometitle', name);
  formdata.append('incomeamount', amount);
  formdata.append('categoryid', categoryid);
  formdata.append('file', file);

  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.createIncome(formdata, token);
  } catch (error) {
    const message =
      (error.response && error.reponse.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update  Income
export const updateIncome = createAsyncThunk('incomes/update', async (incomeData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    const { incomeid } = incomeData;
    return await incomeService.updateIncomes(incomeid, incomeData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user Incomes
export const getIncomes = createAsyncThunk('incomes/getAll', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.getIncomes(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user Incomes
export const deleteIncome = createAsyncThunk('incomes/delete', async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.deleteIncome(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const incomeSlice = createSlice({
  name: 'income',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomes.push(action.payload);
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomes = state.incomes.map((income) => {
          if (income._id === action.payload._id) {
            return {
              ...income
              // category_name: action.payload.category_name,
              // category_type: action.payload.category_type,
              // category_desc: action.payload.category_desc,
              // color: action.payload.color
            };
          }
          return income;
        });
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getIncomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomes = action.payload;
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomes = state.incomes.filter((income) => income._id !== action.payload.id);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = incomeSlice.actions;

export default incomeSlice.reducer;
