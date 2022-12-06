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
  return response;
};

// Get user Incomes

const getIncomes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/income`, config);
  return response;
};

// Delete user Income
const deleteIncome = async (incomeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${baseURL}/income/${incomeId}`, config);
  return response;
};

const incomeService = {
  createIncome,
  updateIncome,
  getIncomes,
  deleteIncome
};

export default incomeService;
