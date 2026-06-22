import { createContext, useContext, useState } from 'react';

const GamificacionContext = createContext(null);

export const GamificacionProvider = ({ children }) => {
  const [puntos, setPuntos]         = useState(0);
  const [racha, setRacha]           = useState(0);
  const [protectores, setProtectores] = useState(0);
  const actualizarTrasEjercicio = ({ puntosObtenidos, puntosTotalesNuevos }) => {
    setPuntos(puntosTotalesNuevos);
    setRacha((prev) => prev + 1);
  };

  return (
    <GamificacionContext.Provider
      value={{ puntos, racha, protectores, setProtectores, actualizarTrasEjercicio }}
    >
      {children}
    </GamificacionContext.Provider>
  );
};

export const useGamificacion = () => useContext(GamificacionContext);