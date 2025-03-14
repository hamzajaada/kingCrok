import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import product1 from "../../asset/images/product1.webp";
import product2 from "../../asset/images/product2.webp";
import product3 from "../../asset/images/product3.webp";
import product4 from "../../asset/images/product4.webp";
import product5 from "../../asset/images/product5.webp";

const MultiProductSlider = () => {
  const products = [
    {
      id: 1,
      name: "Basic 22/9",
      image: product1,
      color: "blue",
    },
    {
      id: 2,
      name: "Activity 27/12",
      image: product2,
      color: "red",
    },
    {
      id: 3,
      name: "Energy 33/15",
      image: product3,
      color: "yellow",
    },
    {
      id: 4,
      name: "Adult premium 29/15",
      image: product4,
      color: "gray",
    },
    {
      id: 5,
      name: "Basic Plus 24/10",
      image: product5,
      color: "green",
    },
    {
      id: 6,
      name: "Senior 26/11",
      image: product1,
      color: "purple",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Titre */}
      <div className="text-center mb-12">
        <h2 className="text-[30px] font-bold text-custcolor mb-2">
          LES PLUS VENDUS
        </h2>
        <p className="text-[20px] font-semibold text-custcolor">
          Nos gammes à succès
        </p>
      </div>

      <Swiper
        modules={[Autoplay ]}
        spaceBetween={30}
        slidesPerView={4}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
       
        loop={true}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="w-full h-full">
              <div className="w-full h-[75%]">
                <img src={product.image} className="rounded-xl" alt={product.name} />
              </div>
              <div className="w-full flex justify-center items-center">
                <div>
                  <p className="text-center mb-2 text-[20px] font-bold text-gracolor">
                    {product.name}
                  </p>
                  <button className="bg-custcolor text-white px-5 py-2 rounded-md hover:bg-[#5d5a50] transition-colors">
                    Voir tous les produits
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bouton Voir tous les produits */}
      <div className="text-center mt-8">
        <button className="bg-custcolor text-white px-8 py-3 rounded-md hover:bg-[#5d5a50] transition-colors">
          Voir tous les produits
        </button>
      </div>
    </div>
  );
};

export default MultiProductSlider;