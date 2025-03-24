import React from "react";
import logo from "../../asset/images/logofooter.png";

const Footer = ({ scrollToSection, Contact }) => {
  return (
    <div className="w-full h-80 bg-backgroundgray">
      <div className="lg:grid lg:grid-cols-3">
        {/* Colonne 1 : Logo */}
        <div className="flex items-center justify-end">
          <div className="w-[50%] h-[70%]">
            <img src={logo} className="w-full h-full" alt="Logo" />
          </div>
        </div>

        {/* Colonne 2 : Adresse et liens sociaux */}
        <div className="flex justify-center items-center pl-3">
          <div>
            <p className="font-semibold text-custcolor">
              Address: 15 Rue des Éleveurs <br /> 69001 Lyon, France <br /> Phone:
              +33 4 78 56 89 12 <br /> Email: contact@kingcroc.fr <br />{" "}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> <br />{" "}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> <br />{" "}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </div>
        </div>

        {/* Colonne 3 : Liens de navigation */}
        <div className="flex items-center pl-3">
          <div>
            <p className="font-semibold text-custcolor">
              <a href="/">Accueil</a> <br />{" "}
              <a href="/product">Produits</a> <br />{" "}
              {/* <a href="/about">À propos</a> <br /> */}
              <a
                className="cursor-pointer"
                onClick={() => scrollToSection(Contact)}
              >
                Contact
              </a>{" "}
              <br />
              <a href="/mentions-legales">Mentions légales</a> <br />
              <a href="/politique-confidentialite">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full mt-5">
        <p className="text-center font-semibold text-gracolor">
          © 2025 KINGCROC. Tous droits réservés
        </p>
      </div>
    </div>
  );
};

export default Footer;