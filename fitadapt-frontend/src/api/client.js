import axios from 'axios';

// Instancia única de axios para todas las llamadas al backend.
// Si en algún momento cambia el host/puerto del backend, solo se
// actualiza aquí.
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export default api;
