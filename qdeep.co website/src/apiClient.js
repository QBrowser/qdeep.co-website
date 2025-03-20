// apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qdeep.co',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor موحد للأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error.response ? error.response.data : { message: error.message });
  }
);

export const loginUser = async (credentials) => {
  const { data } = await api.post('/login', credentials);
  return data;
};

export const checkSession = async (sessionId) => {
  try {
    const { data } = await api.get(`/session/${sessionId}`);
    return data;
  } catch (error) {
    console.warn('⚠️ Session check failed:', error);
    return null;
  }
};

export const logoutUser = async (sessionId) => {
  const { data } = await api.post('/logout', { sessionId });
  return data;
};

export const registerUser = async (userInfo) => {
  const { data } = await api.post('/register', userInfo);
  return data;
};
