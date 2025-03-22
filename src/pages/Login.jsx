import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../Api/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Vider le localStorage à chaque fois que la page de login est montée
  useEffect(() => {
    localStorage.clear(); // Vide tout le localStorage
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('login', 
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { token, user } = response.data;
      
      // Stocker le token dans localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Rediriger vers la page d'accueil ou dashboard
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setLoading(false);
      
      // Extraire le message d'erreur de la réponse de l'API
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Afficher l'erreur renvoyée par le serveur
      } else {
        setError('Une erreur est survenue lors de la connexion'); // Message d'erreur par défaut
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-customGreen">Connexion</h1>
        
        {/* Afficher l'erreur si elle existe */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Email"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGreen"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-custcolor hover:bg-gracolor text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;