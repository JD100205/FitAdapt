// src/context/ToastContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: 'bg-green-600 text-white',
  error:   'bg-red-600   text-white',
  info:    'bg-indigo-600 text-white',
  warning: 'bg-yellow-500 text-white',
};

const TOAST_ICONS = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((mensaje, tipo = 'info', duracion = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, mensaje, tipo }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duracion);
  }, []);

  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Contenedor de toasts — esquina inferior derecha */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg
              ${TOAST_STYLES[t.tipo]}
              animate-in slide-in-from-right-5 fade-in duration-200`}
          >
            <span className="mt-0.5 font-bold text-lg leading-none">
              {TOAST_ICONS[t.tipo]}
            </span>
            <p className="flex-1 text-sm leading-snug">{t.mensaje}</p>
            <button
              onClick={() => removeToast(t.id)}
              className="opacity-70 hover:opacity-100 text-lg leading-none ml-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Desactivamos la regla de ESLint para Fast Refresh en este hook específico
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);