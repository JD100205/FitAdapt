// src/routes/PublicRoute.jsx
// BUG FIX: Nuevos usuarios (hasProfile === false) deben ir a /onboarding
// antes de acceder al dashboard.
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicRoute() {
  const { isAuth, user } = useAuth();

  if (!isAuth) return <Outlet />;

  // Si el usuario se acaba de registrar y aún no tiene perfil → onboarding
  if (user?.hasProfile === false) {
    return <Navigate to="/onboarding" replace />;
  }

  // Usuario autenticado con perfil completo → dashboard
  return <Navigate to="/dashboard" replace />;
}
