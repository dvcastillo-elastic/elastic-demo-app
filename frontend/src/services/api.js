import axios from 'axios';

// Use relative URLs for API requests (will be handled by nginx)
const api = axios.create({
  baseURL: '/api'
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
