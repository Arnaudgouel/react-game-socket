import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);

  useEffect(() => {

    const fetchLogout = async () => {
      console.log(token);
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      const data = await response.json();
      if (!data.logout) {
        throw new Error('Erreur lors de la déconnexion');
      }
      logout();
      navigate('/login');
    };
    fetchLogout();
    // Clear user session or token
    // Redirect to login page
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;