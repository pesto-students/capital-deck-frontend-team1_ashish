import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService';

const initialState = {
  categories: [],
  categoriesByIncome: [],
  categoriesByExpense: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Create new category
export const createCategory = createAsyncThunk(
  'categories/create',
  async (categoryData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await categoryService.createCategory(categoryData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update new category
export const updateCategory = createAsyncThunk(
  'categories/update',
  async (categoryData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      const { categoryid } = categoryData;
      return await categoryService.updateCategory(categoryid, categoryData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user categories
export const getCategories = createAsyncThunk('categories/getAll', async (_, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await categoryService.getCategories(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user category
export const deleteCategory = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
  try {
    const { token } = thunkAPI.getState().auth.user;
    return await categoryService.deleteCategory(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user categories
export const getCategoriesByIncome = createAsyncThunk(
  'categories/getAllByIncome',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await categoryService.getCategoriesByIncome(token, 'INCOME');
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user categories
export const getCategoriesByExpense = createAsyncThunk(
  'categories/getAllByExpense',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await categoryService.getCategoriesByExpense(token, 'EXPENSE');
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new category for income
export const createCategoryForIncome = createAsyncThunk(
  'categories/createForIncome',
  async (categoryData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await categoryService.createCategory(categoryData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new category for expense
export const createCategoryForExpense = createAsyncThunk(
  'categories/createForExpense',
  async (categoryData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user;
      return await categoryService.createCategory(categoryData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map((category) => {
          if (category._id === action.payload._id) {
            return {
              ...category,
              category_name: action.payload.category_name,
              category_type: action.payload.category_type,
              category_desc: action.payload.category_desc,
              color: action.payload.color
            };
          }
          return category;
        });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.id
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategoriesByIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesByIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categoriesByIncome = action.payload;
      })
      .addCase(getCategoriesByIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategoriesByExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesByExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categoriesByExpense = action.payload;
      })
      .addCase(getCategoriesByExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCategoryForIncome.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createCategoryForIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categoriesByIncome.push(action.payload);
      })
      .addCase(createCategoryForIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCategoryForExpense.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(createCategoryForExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categoriesByExpense.push(action.payload);
      })
      .addCase(createCategoryForExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
