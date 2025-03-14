import React, { useState } from "react";
import Header from "../Components/layout/Header";
import chercher from "../asset/images/chercher.png";
import product1 from "../asset/images/product1.webp";

export default function Product() {
  const [activeCategory, setActiveCategory] = useState(""); // État pour la catégorie sélectionnée

  const categories = [
    "Standard",
    "Viande fraîche",
    "Natural Food",
    "Breedna",
    "Lenda",
    "Sans céréales",
  ];

  return (
    <div>
      <Header />
      <div className="w-full h-16 bg-backgroundgray lg:grid lg:grid-cols-2">
        {/* Liste des catégories */}
        <div className="flex justify-center items-center overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-5 px-4">
            {categories.map((category) => (
              <div key={category} className="relative">
                <button
                  className={`text-custcolor font-bold ${
                    activeCategory === category ? "text-custcolor" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
                {activeCategory === category && (
                  <div className="w-full h-1 bg-custcolor absolute bottom-[-18px] left-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="flex justify-center items-center">
          <div className="w-[80%] flex justify-between items-center">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full p-3 pl-10 border rounded-md focus:outline-none"
            />

            <div className="w-7 h-7 ml-3 flex justify-center items-center">
              <img src={chercher} className="w-full h-full" alt="Rechercher" />
            </div>
          </div>
        </div>
      </div>

      {/* Grille des produits */}
      <div className="min-h-screen py-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-8 lg:px-24 pt-10">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="h-[500px] ">
            <div className="w-full h-[75%] bg-white">
              <img src={product1} alt="Produit" className="w-full h-full object-cover" />
            </div>
            <div className="w-full h-[25%] ">
              <h1 className="text-custcolor font-bold text-[25px] text-center">
                FORMULE 25/8
              </h1>
              <p className="text-custcolor font-semibold text-center">
                Aliment complet jhhn pour chiens adultes
              </p>
              <div className="w-full  flex justify-center">
                <button
                  type="submit"
                  className="w-[50%] mt-5 mx-auto bg-[#767264] text-white py-3 px-6 rounded-md hover:bg-[#5d5a50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#767264]"
                >
                  ENVOYER
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}