// src/context/GamificacionContext.jsx
import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const GamificacionContext = createContext(null);

export const GamificacionProvider = ({ children }) => {
  const { user, actualizarUsuario } = useAuth();

  // Estado derivado directamente de la fuente de verdad (AuthContext)
  const puntos      = user?.puntosTotales    ?? 0;
  const racha       = user?.rachaActual      ?? 0;
  const protectores = user?.protectoresRacha ?? 0;

  const setProtectores = (nuevosProtectores) => {
    actualizarUsuario({ protectoresRacha: nuevosProtectores });
  };

  const actualizarTrasEjercicio = ({ puntosTotalesNuevos, rachaActual }) => {
    actualizarUsuario({ 
      puntosTotales: puntosTotalesNuevos ?? 0, 
      rachaActual: rachaActual ?? 0 
    });
  };

  const actualizarTrasCompra = (nuevosPuntos, nuevosProtectores) => {
    actualizarUsuario({ 
      puntosTotales: nuevosPuntos, 
      protectoresRacha: nuevosProtectores 
    });
  };

  return (
    <GamificacionContext.Provider
      value={{ 
        puntos, 
        racha, 
        protectores, 
        setProtectores, 
        actualizarTrasEjercicio, 
        actualizarTrasCompra 
      }}
    >
      {children}
    </GamificacionContext.Provider>
  );
};

// Con esta línea le indicamos a ESLint que ignore la regla Fast Refresh para este hook específico
// eslint-disable-next-line react-refresh/only-export-components
export const useGamificacion = () => useContext(GamificacionContext);