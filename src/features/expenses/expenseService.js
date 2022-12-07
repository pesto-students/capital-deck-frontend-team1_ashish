import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';

// Create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(`${baseURL}/expense`, expenseData, config);
  return response.data;
};

// Update new expense
const updateExpense = async (expenseId, expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${baseURL}/expense/${expenseId}`, expenseData, config);
  return response.data;
};

// Get user expenses
const getExpenses = async (token, searchExpenseData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  console.log(searchExpenseData);

  const response = await axios.get(`${baseURL}/expense`, config);

  return response.data;
};

// Delete user expense
const deleteExpense = async (expenseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${baseURL}/expense/${expenseId}`, config);

  return response.data;
};

// Get user expenses summary
const getExpensesSummary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/expense/summary`, config);

  return response.data;
};

const expenseService = {
  createExpense,
  updateExpense,
  getExpenses,
  deleteExpense,
  getExpensesSummary
};

export default expenseService;
