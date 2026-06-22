import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PublicRoute() {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Outlet />;
  return <Navigate to={user?.hasProfile ? '/dashboard' : '/onboarding'} replace />;
}