import React, { useState } from "react";
import Header from "../Components/layout/Header";
import Product from "../asset/images/product1.webp";
import Footer from "../Components/Section/Footer";

export default function DetailProduct() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const toggleQuoteForm = () => {
    setShowQuoteForm(!showQuoteForm);
  };

  const closeOnBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowQuoteForm(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-24 lg:grid lg:grid-cols-2 bg-backgroundgray">
        <div className="">
          <div className="pl-32 pt-5">
            <p className="text-custcolor font-bold text-[25px] ">Basic 22/9</p>
            <p className="text-custcolor font-semibold text-[16px] ">
              Sacs de 20kg
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-gracolor font-bold text-[16px] ">
            Produit / Standart / Basic 22/9
          </p>
        </div>
      </div>
      <div className="w-full h-screen flex justify-center">
        <div className="w-[80%] h-[80%] mt-10 lg:grid lg:grid-cols-2 ">
          <div className="">
            <div className="w-full h-[90%] bg-white">
              <img src={Product} className="w-full h-full" alt="" />
            </div>
            <div className="w-full h-[10%]">
              <button
                type="button"
                onClick={toggleQuoteForm}
                className="w-full mt-5 mx-auto bg-[#767264] font-semibold uppercase tracking-[2px] text-white py-3 px-6 rounded-md hover:bg-[#5d5a50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#767264]"
              >
                Demander un devis
              </button>
            </div>
          </div>
          <div className="flex items-center px-10 ">
            <div>
              <p className="text-gracolor font-bold text-[20px]">Description :</p>
              <p>
                Prix du sac à l'unité par quantité : PRIX INDICATIFS SELON LES
                DÉPARTEMENTS – DEMANDEZ VOTRE DEVIS
              </p>
              <p className="text-gracolor font-bold text-[20px]">COMPOSITION : </p>
              <p>
                Céréales, viandes, sous produits d'origine animale et végétales,
                huiles graisses et substances minérales.
              </p>
              <p className="text-gracolor font-bold text-[20px]">Conseil :</p>
              <p>
                Aliment d'entretien pour toute race Très bon rapport qualité prix
              </p>
              <p className="text-gracolor font-bold text-[20px]">Conditionnement :</p>
              <p>Sacs de 20 kg Palette de 39 sacs</p>
              <p className="text-gracolor font-bold text-[20px]">Analyse moyenne brute :</p>
              <p>
                Proteines 22% <br /> Matiére grasse 9% <br /> Cellulose 5% <br /> Cendres 11.5% <br />
                Humidité 10% <br />Vitamines A 7.500 UI /kg <br /> Vitamines D 750 UI / kg <br />
                Vitamine E 45 mg /kg <br /> Cuivre 10 mg /kg
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Popup de demande de devis */}
      {showQuoteForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeOnBackdropClick}
        >
          <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleQuoteForm}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-center mb-6">Demander un devis</h2>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Produit" 
                  className="w-full p-3 border border-gray-300 rounded"
                  readOnly
                  value="Basic 22/9"
                />
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Nom" 
                  className="w-full p-3 border border-gray-300 rounded" 
                  required
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-3 border border-gray-300 rounded" 
                  required
                />
              </div>
              
              <div>
                <input 
                  type="tel" 
                  placeholder="Numéro de téléphone" 
                  className="w-full p-3 border border-gray-300 rounded" 
                  required
                />
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Code postal" 
                  className="w-full p-3 border border-gray-300 rounded" 
                  required
                />
              </div>
              
              <div>
                <input 
                  type="text" 
                  placeholder="Sujet" 
                  className="w-full p-3 border border-gray-300 rounded" 
                  required
                />
              </div>
              
              <div>
                <textarea 
                  placeholder="Message" 
                  className="w-full p-3 border border-gray-300 rounded h-32" 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#767264] text-white py-3 font-semibold uppercase tracking-[2px] hover:bg-[#5d5a50] transition-colors"
              >
                ENVOYER
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}