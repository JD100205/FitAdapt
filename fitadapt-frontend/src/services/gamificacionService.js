import axiosInstance from './axiosConfig';

export const registrarHistorial = (idUsuario, idEjercicio, tiempoReal) =>
  axiosInstance.post('/api/v1/historial/registrar', { idUsuario, idEjercicio, tiempoReal });
export const getRanking = (nivelExperiencia) =>
  axiosInstance.get(`/api/v1/gamificacion/ranking/${nivelExperiencia}`);
export const comprarProtector = (idUsuario) =>
  axiosInstance.post(`/api/v1/tienda/comprar-protector/${idUsuario}`);
