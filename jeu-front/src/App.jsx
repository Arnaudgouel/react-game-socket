import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import AuthContext from './context/AuthContext';
import AuthTest from './pages/AuthTest';
import Logout from './pages/Logout';
import Lobby from './pages/Lobby';

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');

      return savedUser !== undefined ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture du user dans localStorage:', error);
      localStorage.removeItem('user'); // On nettoie le localStorage si les données sont corrompues
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch (error) {
      console.error('Erreur lors de la lecture du token dans localStorage:', error);
      localStorage.removeItem('token');
      return null;
    }
  });

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={user ? "/profile" : "/login"} />} />
            <Route path="/test" element={<AuthTest />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/lobby" element={<Lobby />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

