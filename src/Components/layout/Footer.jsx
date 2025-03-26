import React from "react";
import logo from "../../asset/images/logofooter.png";

const Footer = ({ scrollToSection, Contact }) => {
  return (
    <div className="w-full bg-backgroundgray py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne 1 : Logo */}
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-48 h-36">
            <img src={logo} className="w-full h-full object-contain" alt="Logo" />
          </div>
        </div>

        {/* Colonne 2 : Adresse et liens sociaux */}
        <div className="flex justify-center items-start text-center md:text-left">
          <div>
            <p className="font-semibold text-custcolor space-y-2">
              <span>Address: 15 Rue des Éleveurs</span>
              <span>69001 Lyon, France</span>
              <span>Phone: +33 4 78 56 89 12</span>
              <span>Email: contact@kingcroc.fr</span>
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Facebook</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">Instagram</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">LinkedIn</a>
              </div>
            </p>
          </div>
        </div>

        {/* Colonne 3 : Liens de navigation */}
        <div className="flex justify-center items-start text-center md:text-left">
          <div>
            <p className="font-semibold text-custcolor space-y-2">
              <a href="/" className="block hover:text-gray-600">Accueil</a>
              <a href="/product" className="block hover:text-gray-600">Produits</a>
              <a
                className="block cursor-pointer hover:text-gray-600"
                onClick={() => scrollToSection(Contact)}
              >
                Contact
              </a>
              <a href="/mentions-legales" className="block hover:text-gray-600">Mentions légales</a>
              <a href="/politique-confidentialite" className="block hover:text-gray-600">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full mt-8">
        <p className="text-center font-semibold text-gracolor">
          © 2025 KINGCROC. Tous droits réservés
        </p>
      </div>
    </div>
  );
};

export default Footer;