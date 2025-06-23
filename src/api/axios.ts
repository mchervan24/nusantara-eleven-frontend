// frontend/src/api/axios.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Default ke 5000 sesuai backend

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      // Opsional: window.location.href = '/login'; untuk mengarahkan pengguna
      // toast.error("Sesi Anda berakhir. Silakan login kembali.");
    }
    return Promise.reject(error);
  }
);

export default api;