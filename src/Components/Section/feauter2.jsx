import React from "react";

export default function feauter2() {
  return (
    <div className="w-full h-auto px-40 my-10">
      <div className="w-full h-80 bg-custcolor rounded-2xl  py-5">
        <h1 className="text-white  font-bold  text-[30px] uppercase text-center">
          comment pouvons-nous commander les produits?
        </h1>
        <div className=" flex justify-center ">
          <div className="lg:grid lg:grid-cols-3 gap-28 mt-5 w-auto  ">
            <div className=" flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 font-bold text-[30px] text-custcolor flex justify-center items-center rounded-full bg-white">
                1
              </div>
              <p className="text-white font-bold text-[20px] text-center uppercase mt-4">
              choisissez votre <br /> catégorie
              </p>
            </div>

           <div className=" flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 font-bold text-[30px] text-custcolor flex justify-center items-center rounded-full bg-white">
                2
              </div>
              <p className="text-white font-bold text-[20px] text-center uppercase mt-4">
              choisissez votre <br /> produit
              </p>
            </div>
           <div className=" flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 font-bold text-[30px] text-custcolor flex justify-center items-center rounded-full bg-white">
                3
              </div>
              <p className="text-white font-bold text-[20px] text-center uppercase mt-4">
              Demander un <br /> devis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
