import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${baseURL}/users`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${baseURL}/users/login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login
};

export default authService;
