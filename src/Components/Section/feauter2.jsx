import React from "react";

export default function Feature2() {
  return (
    <div className="w-full h-auto px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 my-8 md:my-10">
      <div className="w-full bg-custcolor rounded-xl md:rounded-2xl py-6 md:py-8 px-4 md:px-6">
        <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl uppercase text-center mb-6">
          Comment pouvons-nous commander les produits?
        </h1>
        
        <div className="flex justify-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-16">
            {/* Step 1 */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 font-bold text-xl md:text-2xl lg:text-3xl text-custcolor flex justify-center items-center rounded-full bg-white shadow-md">
                1
              </div>
              <p className="text-white font-bold text-base sm:text-lg md:text-xl text-center uppercase mt-4">
                choisissez votre <br /> catégorie
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 font-bold text-xl md:text-2xl lg:text-3xl text-custcolor flex justify-center items-center rounded-full bg-white shadow-md">
                2
              </div>
              <p className="text-white font-bold text-base sm:text-lg md:text-xl text-center uppercase mt-4">
                choisissez votre <br /> produit
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center justify-center py-4 sm:col-span-2 lg:col-span-1">
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 font-bold text-xl md:text-2xl lg:text-3xl text-custcolor flex justify-center items-center rounded-full bg-white shadow-md">
                3
              </div>
              <p className="text-white font-bold text-base sm:text-lg md:text-xl text-center uppercase mt-4">
                Demander un <br /> devis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}