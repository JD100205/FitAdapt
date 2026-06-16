import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Si la ruta es solo "/", muestra el Login */}
        <Route path="/" element={<Login />} />
        
        {/* Si la ruta es "/dashboard", muestra el Panel */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;