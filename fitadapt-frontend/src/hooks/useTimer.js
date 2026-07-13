// src/hooks/useTimer.js
import { useState, useEffect, useRef, useCallback } from 'react';

export default function useTimer(minutosIniciales) {
  // Se inicializa limpiamente con el valor inicial
  const [segundosRestantes, setSegundosRestantes] = useState(minutosIniciales * 60);
  const [activo, setActivo]                         = useState(false);
  const [transcurridos, setTranscurridos]           = useState(0);
  const intervalRef                                 = useRef(null);

  // Único efecto: Maneja exclusivamente el intervalo del cronómetro
  useEffect(() => {
    if (activo) {
      intervalRef.current = setInterval(() => {
        setSegundosRestantes((prev) => Math.max(prev - 1, 0));
        setTranscurridos((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activo]);

  const iniciar  = useCallback(() => setActivo(true), []);
  const pausar   = useCallback(() => setActivo(false), []);
  
  const reiniciar = useCallback(() => {
    setActivo(false);
    setSegundosRestantes(minutosIniciales * 60);
    setTranscurridos(0);
  }, [minutosIniciales]);

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