// src/pages/AuthTest.jsx
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function AuthTest() {
  const authContext = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Test AuthContext</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold">État de l'authentification :</h3>
          <p>Utilisateur connecté : {authContext.user ? 'Oui' : 'Non'}</p>
        </div>

        {authContext.user && (
          <div>
            <h3 className="font-bold">Informations utilisateur :</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(authContext.user, null, 2)}
            </pre>
          </div>
        )}

        {authContext.token && (
          <div>
            <h3 className="font-bold">Token JWT :</h3>
            <p className="break-all bg-gray-100 p-2 rounded">{authContext.token}</p>
          </div>
        )}

        <div className="space-x-4">
          {!authContext.user && (
            <button
              onClick={() => authContext.login(
                { id: 1, username: 'test', email: 'test@test.com' },
                'test-token-123'
              )}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Simuler Connexion
            </button>
          )}

          {authContext.user && (
            <button
              onClick={authContext.logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthTest;