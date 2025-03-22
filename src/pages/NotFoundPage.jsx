import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-customGreen">404</h1>
          <div className="h-1 w-16 bg-customGreen mx-auto my-4"></div>
          <h2 className="text-3xl font-semibold mb-3">Page non trouvée</h2>
          <p className="text-gray-600 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3  text-white font-medium rounded-md bg-custcolor hover:bg-gracolor transition-colors duration-300 w-full sm:w-auto"
          >
            Retour à l'accueil
          </Link>
          
        
        </div>
        
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support technique.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;