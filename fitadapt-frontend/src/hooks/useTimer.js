import { useState, useEffect, useRef } from 'react';

export default function useTimer(minutosIniciales) {
  const [segundosRestantes, setSegundosRestantes] = useState(minutosIniciales * 60);
  const [activo, setActivo]                        = useState(false);
  const [transcurridos, setTranscurridos]          = useState(0);
  const intervalRef                                = useRef(null);

  useEffect(() => {
    if (activo) {
      intervalRef.current = setInterval(() => {
        setSegundosRestantes((prev) => Math.max(prev - 1, 0));
        setTranscurridos((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [activo]);

  const iniciar  = () => setActivo(true);
  const pausar   = () => setActivo(false);
  const reiniciar = () => {
    setActivo(false);
    setSegundosRestantes(minutosIniciales * 60);
    setTranscurridos(0);
  };

  return {
    segundosRestantes,
    transcurridos,
    activo,
    iniciar,
    pausar,
    reiniciar,
    minutos: Math.floor(segundosRestantes / 60),
    segundos: segundosRestantes % 60,
  };
}

