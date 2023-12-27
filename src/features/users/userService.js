import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';

// Get user
const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(`${baseURL}/users/me`, config);

  return response.data;
};

// Update user
const updateUser = async (token, id, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(`${baseURL}/users/${id}`, data, config);

  if (response.data) {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    userStorage.name = response.data.name;
    userStorage.email = response.data.email;
    userStorage.file_path = response.data.file_path;
    localStorage.setItem('user', JSON.stringify(userStorage));
  }

  return response.data;
};

const userService = {
  getUser,
  updateUser
};

export default userService;
