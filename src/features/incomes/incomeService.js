import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';

// Create new Income
const createIncome = async (incomeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(`${baseURL}/income`, incomeData, config);
  return response.data;
};

// Update new Income
const updateIncome = async (incomeId, incomeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${baseURL}/income/${incomeId}`, incomeData, config);
  return response.data;
};

// Get user Incomes
const getIncomes = async (token, searchIncomeData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(
    `${baseURL}/income?search=${JSON.stringify(searchIncomeData)}`,
    config
  );

  return response.data;
};

// Delete user Income
const deleteIncome = async (incomeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${baseURL}/income/${incomeId}`, config);

  return response.data;
};

// Get user incomes summary
const getIncomesSummary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/income/summary`, config);

  return response.data;
};

// Get user amout by incomes
const getAmountIncomesSummary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/income/amountincome`, config);

  return response.data;
};

// Get user recent incomes
const getRecentIncomes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/income/recent`, config);

  return response.data;
};

const incomeService = {
  createIncome,
  updateIncome,
  getIncomes,
  deleteIncome,
  getIncomesSummary,
  getAmountIncomesSummary,
  getRecentIncomes
};

export default incomeService;
