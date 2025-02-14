import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { socket } from '../socket';


const Game = () => {

  const [mates, setMates] = useState([]);

  useEffect(() => {
    socket.on('join-game', (data) => {
      console.log(data);
      setMates(data.mate);
    });

    return () => {
      socket.off('join-game');
    };
  }, []);

  return (
    <div className="lobby flex flex-col items-center justify-center min-h-full bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Partie</h1>
      {mates && mates.length > 0 ? (
        mates.map((mate) => (
          <p key={mate.username}>{mate.username}</p>
        ))
      ) : (
        <p>Vous êtes solo comme Han Solo</p>
      )}
    </div>
  );
};

export default Game;