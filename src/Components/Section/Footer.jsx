import React from "react";

import logo from "../../asset/images/logofooter.png"
export default function Footer() {
  return (
    <div className="w-full h-80  bg-backgroundgray ">
      <div className="lg:grid lg:grid-cols-3">
         <div className="flex items-center justify-end">
        <div className="w-[50%] h-[70%] ">
          <img src={logo} className="w-full h-full" alt="" srcset="" />
        </div>
      </div>

      <div className=" flex justify-center items-center pl-3 ">
        <div>
          <p className="font-semibold text-custcolor">
            Address: 15 Rue des Éleveurs <br /> 69001 Lyon, France <br /> Phone:
            +33 4 78 56 89 12 <br /> Email: contact@kingcroc.fr <br />{" "}
            <a href="">Facebook</a> <br /> <a href="">Instagram</a> <br />{" "}
            <a href="">LinkedIn</a>
          </p>
        </div>
      </div>

      <div className=" flex items-center pl-3 ">
        <div>
          <p className="font-semibold text-custcolor">
            <a href="">Accueil</a> <br /> <a href="">Produits</a> <br />{" "}
            <a href=""> À propos</a> <br />
            <a href=""> Contact</a> <br />
            <a href=""> Mentions légales</a> <br />
            <a href=""> Politique de confidentialité</a>
          </p>
        </div>
      </div>
      </div>

        <div className="w-full  mt-5">
          <p className="text-center font-semibold text-gracolor" >© 2025 KINGCROC. Tous droits réservés</p>
        </div>
     
    </div>
  );
}
