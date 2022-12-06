/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/users/userSlice';
import categoryReducer from '../features/categories/categorySlice';
import expenseReducer from '../features/expenses/expenseSlice';
import incomeReducer from '../features/incomes/incomeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    categories: categoryReducer,
    expenses: expenseReducer,
    incomes: incomeReducer
  }
});
