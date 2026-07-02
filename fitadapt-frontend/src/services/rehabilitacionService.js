import axiosInstance from './axiosConfig';

// POST /api/v1/rehabilitation/validate
// Body: { idUsuario, idEjercicio }
// Response: { esSeguro: boolean, mensajeFeedback: string }
export const validarEjercicioRehab = (idUsuario, idEjercicio) =>
  axiosInstance.post('/api/v1/rehabilitation/validate', { idUsuario, idEjercicio });
