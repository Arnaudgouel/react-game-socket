import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Lobby = () => {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState('');
  const { token, user } = useContext(AuthContext);

  const handleCreateGame = async () => {
    // Logic to create a game
    try {
      const response = await fetch('http://localhost:3000/game', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erreur de création de la partie');
      }

      navigate('/game/' + data.gameId); // Navigate to the create game page
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleJoinGame = async () => {
    try {
      const response = await fetch('http://localhost:3000/game/join/' + gameCode, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erreur de création de la partie');
      }

      navigate('/game/' + data.gameId); // Navigate to the create game page
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lobby flex flex-col items-center justify-center min-h-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Lobby</h1>
      <button
        onClick={handleCreateGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Créer une partie
      </button>
      <div className='flex items-center justify-center gap-4'>
        <input type="text" placeholder="Code de la partie" className="border border-gray-400 p-2 rounded" value={gameCode}
          onChange={(e) => setGameCode(e.target.value)} />
      <button
        onClick={handleJoinGame}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Rejoindre une partie
      </button>
      </div>
    </div>
  );
};

export default Lobby;