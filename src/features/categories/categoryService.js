import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';

// Create new category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(`${baseURL}/categories`, categoryData, config);
  return response.data;
};

// Update new category
const updateCategory = async (categoryId, categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${baseURL}/categories/${categoryId}`, categoryData, config);
  return response.data;
};

// Get user categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/categories`, config);
  return response.data;
};

// Delete user category
const deleteCategory = async (categoryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${baseURL}/categories/${categoryId}`, config);
  return response.data;
};

// Get user categories by income
const getCategoriesByIncome = async (token, type) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/categories/${type}`, config);
  return response.data;
};

// Get user categories by expense
const getCategoriesByExpense = async (token, type) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/categories/${type}`, config);
  return response.data;
};

const categoryService = {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  getCategoriesByIncome,
  getCategoriesByExpense
};

export default categoryService;
