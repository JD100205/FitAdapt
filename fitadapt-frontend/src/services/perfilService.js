
import axiosInstance from './axiosConfig';

export const crearPerfil = (datos) =>
  axiosInstance.post('/api/v1/perfiles', datos);
export const registrarLesiones = (idUsuario, idsZonasLesionadas) =>
  axiosInstance.post('/api/v1/lesiones/usuario', { idUsuario, idsZonasLesionadas });