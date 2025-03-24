import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import axios from "axios";

import product1 from "../../asset/images/product1.webp";
import product2 from "../../asset/images/product2.webp";
import product3 from "../../asset/images/product3.webp";
import product4 from "../../asset/images/product4.webp";
import product5 from "../../asset/images/product5.webp";
import api from "../../Api/api"
const MultiProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les produits depuis l'API
    const fetchProducts = async () => {
      try {
        console.log("before");
        const response = await api.get("products");
        console.log(response);
        const productsData = response.data.map(product => ({
          id: product.id,
          name: product.name,
          image: product.image_url, // Vous pouvez garder une image statique ou la remplacer par une image dynamique si disponible dans l'API
        }));
       
        
        setProducts(productsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Titre */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-custcolor mb-2">
          LES PLUS VENDUS
        </h2>
        <p className="text-lg md:text-xl font-semibold text-custcolor">
          Nos gammes à succès
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop={true}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full flex flex-col">
              <div className="relative mb-4 aspect-square">
                <img 
                  src={`${api.imageUrl}${product.image}`} 
                  className="w-full h-full object-cover rounded-xl shadow-md" 
                  alt={product.name} 
                />
              </div>
              <div className="flex flex-col items-center justify-between flex-grow">
                <p className="text-center mb-4 text-lg md:text-xl font-bold text-gracolor">
                  {product.name}
                </p>
                <Link 
                  to={`/detailProduct/${product.id}`} 
                  className="bg-custcolor text-white px-4 py-2 rounded-md hover:bg-[#5d5a50] transition-colors text-sm md:text-base"
                >
                  Voir le produit
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bouton Voir tous les produits */}
      <div className="text-center mt-6 md:mt-8">
        <Link 
          to="/product" 
          className="bg-custcolor text-white px-6 py-2 md:px-8 md:py-3 rounded-md hover:bg-[#5d5a50] transition-colors inline-block font-medium"
        >
          Voir tous les produits
        </Link>
      </div>
    </div>
  );
};

export default MultiProductSlider;