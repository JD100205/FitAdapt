import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('fitadapt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


const PUBLIC_AUTH_PATHS = ['/api/auth/login', '/api/auth/registro'];

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || '';
    const esRutaPublica = PUBLIC_AUTH_PATHS.some((p) => url.includes(p));

    if (error.response?.status === 401 && !esRutaPublica) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;