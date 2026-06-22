// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }         from './context/AuthContext';
import { GamificacionProvider } from './context/GamificacionContext';
import { ToastProvider }        from './context/ToastContext';

import PublicRoute   from './routes/PublicRoute';
import PrivateRoute  from './routes/PrivateRoute';
import PrivateLayout from './components/layout/PrivateLayout';

import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage  from './pages/DashboardPage';
import WorkoutPage    from './pages/WorkoutPage';
import ScoreboardPage from './pages/ScoreboardPage';
import TiendaPage     from './pages/TiendaPage';

export default function App() {
  return (
    <AuthProvider>
      <GamificacionProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Rutas públicas */}
              <Route element={<PublicRoute />}>
                <Route path="/login"    element={<LoginPage />} />
                <Route path="/registro" element={<RegisterPage />} />
              </Route>

              {/* Onboarding — protegida pero sin navbar */}
              <Route element={<PrivateRoute />}>
                <Route path="/onboarding" element={<OnboardingPage />} />
              </Route>

              {/* Rutas privadas con layout */}
              <Route element={<PrivateRoute />}>
                <Route element={<PrivateLayout />}>
                  <Route path="/dashboard"     element={<DashboardPage />} />
                  <Route path="/entrenamiento" element={<WorkoutPage />} />
                  <Route path="/ranking"       element={<ScoreboardPage />} />
                  <Route path="/tienda"        element={<TiendaPage />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </GamificacionProvider>
    </AuthProvider>
  );
}