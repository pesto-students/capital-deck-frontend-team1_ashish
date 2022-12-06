/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expenseService from './expenseService';

const initialState = {
  expenses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create new expense
export const createExpense = createAsyncThunk('expenses/create', async (expenseData, thunkAPI) => {
  const { date, name, amount, categoryid, file } = expenseData;

  const formdata = new FormData();
  formdata.append('expensedate', date);
  formdata.append('expensetitle', name);
  formdata.append('expenseamount', amount);
  formdata.append('categoryid', categoryid);
  formdata.append('file', file);

  try {
    const { token } = thunkAPI.getState().auth.user;
    return await expenseService.createExpense(formdata, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update new expense
export const updateExpense = createAsyncThunk('expenses/update', async (expenseData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    const { expenseid } = expenseData;
    return await expenseService.updateExpense(expenseid, expenseData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user expenses
export const getExpenses = createAsyncThunk('expenses/getAll', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await expenseService.getExpenses(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user expense
export const deleteExpense = createAsyncThunk('expenses/delete', async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await expenseService.deleteExpense(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = state.expenses.map((expense) => {
          if (expense._id === action.payload._id) {
            return {
              ...expense
              // category_name: action.payload.category_name,
              // category_type: action.payload.category_type,
              // category_desc: action.payload.category_desc,
              // color: action.payload.color
            };
          }
          return expense;
        });
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = state.expenses.filter((expense) => expense._id !== action.payload.id);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;