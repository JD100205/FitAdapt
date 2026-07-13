import axiosInstance from './axiosConfig';

export const loginUsuario = (email, contrasenia) =>
  axiosInstance.post('/api/auth/login', { email, contrasenia });

export const registrarUsuario = (nombre, email, contrasenia) =>
  axiosInstance.post('/api/auth/registro', { nombre, email, contrasenia });