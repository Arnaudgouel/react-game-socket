import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">Mon App</Link>
        <div>
          {user ? (
            <>
              <Link to="/profile" className="mr-4">Profil</Link>
              <Link to="/logout" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Déconnexion
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Connexion</Link>
              <Link to="/register" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;