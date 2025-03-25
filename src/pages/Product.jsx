import React, { useState, useEffect } from "react";
import axios from "axios"; // Pour faire des requêtes HTTP
import Header from "../Components/layout/Header";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import product1 from "../asset/images/product1.webp";
import { Link, useLocation } from "react-router-dom";
import api from "../Api/api";

export default function Product() {
  const [activeCategory, setActiveCategory] = useState("Tous"); // Sélection par défaut
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const brandFromURL = queryParams.get("brand");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          api.get("brands"),
          api.get("products"),
        ]);

         
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data.data);

        if (brandFromURL) {
          setActiveCategory(brandFromURL);
        }
      } catch (error) {
        setError("Erreur lors du chargement des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [brandFromURL]);

  const filteredProducts = products.filter(
    (product) =>
      (activeCategory === "Tous" || product.brand?.name === activeCategory) &&
      (searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const scrollCategories = (direction) => {
    const container = document.getElementById("categories-container");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return <div className="text-center py-8">Chargement en cours...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="sticky top-0 z-10 w-full bg-backgroundgray shadow-md">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="relative flex items-center w-full lg:w-2/3">
              <button onClick={() => scrollCategories("left")} className="lg:hidden flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-md mr-2">
                <ChevronLeft size={18} />
              </button>
              <div id="categories-container" className="flex overflow-x-auto scrollbar-hide py-2 space-x-6 flex-nowrap">
                {/* Bouton "Tous" */}
                <div className="relative flex-shrink-0">
                  <button
                    className={`text-custcolor font-medium text-sm md:text-base whitespace-nowrap px-1 py-2 transition-colors ${
                      activeCategory === "Tous" ? "font-bold" : "hover:text-gray-600"
                    }`}
                    onClick={() => setActiveCategory("Tous")}
                  >
                    Tous
                  </button>
                  {activeCategory === "Tous" && (
                    <div className="w-full h-1 bg-custcolor absolute bottom-0 left-0 rounded-t-md"></div>
                  )}
                </div>

                {/* Boutons des marques */}
                {categories.map((category) => (
                  <div key={category.id} className="relative flex-shrink-0">
                    <button
                      className={`text-custcolor font-medium text-sm md:text-base whitespace-nowrap px-1 py-2 transition-colors ${
                        activeCategory === category.name ? "font-bold" : "hover:text-gray-600"
                      }`}
                      onClick={() => setActiveCategory(category.name)}
                    >
                      {category.name}
                    </button>
                    {activeCategory === category.name && (
                      <div className="w-full h-1 bg-custcolor absolute bottom-0 left-0 rounded-t-md"></div>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={() => scrollCategories("right")} className="lg:hidden flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-md ml-2">
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="relative w-full lg:w-1/3">
              <input type="text" placeholder="Rechercher un produit..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-custcolor border-gray-300" />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-custcolor mb-6">
          {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} {activeCategory && `dans "${activeCategory}"`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-square overflow-hidden">
              <img src={`${api.imageUrl}${product.image_url}`} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />                <div className="absolute top-2 right-2 bg-custcolor text-white text-xs px-2 py-1 rounded-full">
                  {product.brand?.name || "Standard"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-custcolor font-bold text-xl mb-1 text-center">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 text-center">{product.description}</p>
                <div className="flex justify-center">
                  <Link to={`/detailProduct/${product.id}`} className="w-full bg-[#767264] text-white py-3 px-6 rounded-md hover:bg-[#5d5a50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#767264] text-sm font-semibold text-center">
                    VOIR DÉTAILS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">Aucun produit ne correspond à votre recherche.</p>
            <button className="mt-4 text-custcolor font-medium underline" onClick={() => { setSearchQuery(""); setActiveCategory("Tous"); }}>Réinitialiser les filtres</button>
          </div>
        )}
      </div>
    </div>
  );
}