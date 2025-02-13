import React from 'react';
import { useNavigate } from 'react-router-dom';

const Lobby = () => {
  const navigate = useNavigate();

  const handleCreateGame = () => {
    // Logic to create a game
    navigate('/create-game'); // Navigate to the create game page
  };

  const handleJoinGame = () => {
    // Logic to join a game
    navigate('/join-game'); // Navigate to the join game page
  };

  return (
    <div className="lobby flex flex-col items-center justify-center min-h-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Lobby</h1>
      <button
        onClick={handleCreateGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create Game
      </button>
      <button
        onClick={handleJoinGame}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Join Game
      </button>
    </div>
  );
};

export default Lobby;