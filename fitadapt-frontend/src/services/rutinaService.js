import axiosInstance from './axiosConfig';

export const getRutinaHoy = (idUsuario) =>
  axiosInstance.get(`/api/v1/rutinas/hoy/${idUsuario}`);
export const generarRutina = (idUsuario, volumen = 'Normal') =>
  axiosInstance.post(`/api/v1/rutinas/generar/${idUsuario}?volumen=${volumen}`);
