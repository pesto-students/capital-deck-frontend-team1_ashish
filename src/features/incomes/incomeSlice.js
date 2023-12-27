import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import incomeService from './incomeService';

const initialState = {
  incomes: [],
  incomesummary: [],
  incomeamoutsummmary: [],
  recentincome: [],
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

// Update income
export const updateIncome = createAsyncThunk('incomes/update', async (incomeData, thunkAPI) => {
  const { incomeid, date, name, amount, categoryid, file } = incomeData;

  const formdata = new FormData();
  formdata.append('incomedate', date);
  formdata.append('incometitle', name);
  formdata.append('incomeamount', amount);
  formdata.append('categoryid', categoryid);
  formdata.append('file', file);

  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.updateIncome(incomeid, formdata, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user Incomes
export const getIncomes = createAsyncThunk('incomes/getAll', async (searchIncomeData, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.getIncomes(token, searchIncomeData);
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

// Get user incomes summary
export const getIncomesSummary = createAsyncThunk('incomes/getAllSummary', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.getIncomesSummary(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user incomes amount summary
export const getAmountIncomesSummary = createAsyncThunk(
  'incomes/getAllAmoutSummary',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await incomeService.getAmountIncomesSummary(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user recent incomes
export const getRecentIncomes = createAsyncThunk('incomes/getRecent', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await incomeService.getRecentIncomes(token);
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
              ...income,
              income_date: action.payload.income_date,
              income_title: action.payload.income_title,
              income_amount: action.payload.income_amount,
              category_id: action.payload.category_id,
              file_path: action.payload.file_path,
              file_name: action.payload.file_name
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
      })
      .addCase(getIncomesSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncomesSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomesummary = action.payload;
      })
      .addCase(getIncomesSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAmountIncomesSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAmountIncomesSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.incomeamoutsummmary = action.payload;
      })
      .addCase(getAmountIncomesSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecentIncomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recentincome = action.payload;
      })
      .addCase(getRecentIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = incomeSlice.actions;
export default incomeSlice.reducer;
