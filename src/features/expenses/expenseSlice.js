import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expenseService from './expenseService';

const initialState = {
  expenses: [],
  expensesummary: [],
  expenseamoutsummmary: [],
  recentexpense: [],
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

// Update expense
export const updateExpense = createAsyncThunk('expenses/update', async (expenseData, thunkAPI) => {
  const { expenseid, date, name, amount, categoryid, file } = expenseData;

  const formdata = new FormData();
  formdata.append('expensedate', date);
  formdata.append('expensetitle', name);
  formdata.append('expenseamount', amount);
  formdata.append('categoryid', categoryid);
  formdata.append('file', file);

  try {
    const { token } = thunkAPI.getState().auth.user;
    return await expenseService.updateExpense(expenseid, formdata, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user expenses
export const getExpenses = createAsyncThunk(
  'expenses/getAll',
  async (searchExpenseData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await expenseService.getExpenses(token, searchExpenseData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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

// Get user expenses summary
export const getExpensesSummary = createAsyncThunk(
  'expenses/getAllSummary',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await expenseService.getExpensesSummary(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user expenses amount summary
export const getAmountExpensesSummary = createAsyncThunk(
  'expenses/getAllAmoutSummary',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await expenseService.getAmountExpensesSummary(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user recent expenses
export const getRecentExpenses = createAsyncThunk('expenses/getRecent', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await expenseService.getRecentExpenses(token);
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
              ...expense,
              expense_date: action.payload.expense_date,
              expense_title: action.payload.expense_title,
              expense_amount: action.payload.expense_amount,
              category_id: action.payload.category_id,
              file_path: action.payload.file_path,
              file_name: action.payload.file_name
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
      })
      .addCase(getExpensesSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpensesSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expensesummary = action.payload;
      })
      .addCase(getExpensesSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAmountExpensesSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAmountExpensesSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenseamoutsummmary = action.payload;
      })
      .addCase(getAmountExpensesSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecentExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recentexpense = action.payload;
      })
      .addCase(getRecentExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = expenseSlice.actions;
export default expenseSlice.reducer;
