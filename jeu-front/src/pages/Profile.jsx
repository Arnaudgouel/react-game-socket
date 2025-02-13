import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { user, token, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
        if (error.message.includes('401')) {
          logout();
        }
      }
    };

    fetchUserData();
  }, [token, logout]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profil</h2>
      <div className="bg-white shadow rounded p-4">
        <p><strong>Nom d'utilisateur:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    </div>
  );
}

export default Profile;