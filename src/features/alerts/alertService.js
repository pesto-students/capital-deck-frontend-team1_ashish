import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';

// Create new alert
const createAlert = async (alertData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(`${baseURL}/alert`, alertData, config);
  return response.data;
};

// Get user alerts
const getAlerts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${baseURL}/alert`, config);
  return response.data;
};

// Delete user alert
const deleteAlert = async (alertId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${baseURL}/alert/${alertId}`, config);
  return response.data;
};

const alertService = {
  createAlert,
  getAlerts,
  deleteAlert
};

export default alertService;
