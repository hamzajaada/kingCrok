import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../asset/images/logo.png";
import phone from "../../asset/images/phone.png";

const ResponsiveHeader = ({ scrollToSection, Contact, Apropos }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const productMenuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);

    // Fetch brands when opening the menu if we don't have them yet
    if (!isProductsOpen && brands.length === 0 && !isLoading) {
      fetchBrands();
    }
  };

  const fetchBrands = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://croquette.sa-pub.com/api/brands");
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des marques:", err);
      setError("Impossible de charger les marques");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour naviguer vers la page des produits avec la marque comme filtre
  const handleBrandClick = (brandName) => {
    navigate(`/product?brand=${encodeURIComponent(brandName)}`);
    setIsProductsOpen(false);
    setIsMenuOpen(false);
  };

  // Ferme le menu des produits si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full shadow-lg">
      <div className="px-4 lg:px-48 h-20 lg:h-32">
        {/* Main header container */}
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <div className="w-12 lg:w-16 h-12 lg:h-16">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-full h-full" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            <Link to="/" className="text-custcolor font-bold text-lg hover:text-gray-600">
              Accueil
            </Link>

            {/* Menu déroulant pour les marques */}
            <div className="relative" ref={productMenuRef}>
              <button
                onClick={toggleProductsMenu}
                className="text-custcolor font-bold text-lg hover:text-gray-600 flex items-center"
              >
                Marques
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductsOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isLoading ? (
                    <div className="px-4 py-2 text-gray-500">Chargement...</div>
                  ) : error ? (
                    <div className="px-4 py-2 text-red-500">{error}</div>
                  ) : (
                    <>
                      {brands.length > 0 ? (
                        brands.map((brand) => (
                          <button
                            key={brand.id || brand.name}
                            onClick={() => handleBrandClick(brand.name)}
                            className="block w-full text-left px-4 py-2 text-custcolor hover:bg-gray-100"
                          >
                            {brand.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-500">Aucune marque disponible</div>
                      )}
                      <Link to="/product" className="block px-4 py-2 text-custcolor hover:bg-gray-100 font-semibold">
                        Toutes les marques
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* <a
              className="text-custcolor cursor-pointer font-bold text-lg hover:text-gray-600"
              onClick={() => scrollToSection(Apropos)}
            >
              À Propos
            </a> */}
            <a
              className="text-custcolor cursor-pointer font-bold text-lg hover:text-gray-600"
              onClick={() => scrollToSection(Contact)}
            >
              Contact
            </a>
            <a href="tel:0617352356" className="text-custcolor font-bold text-lg flex items-center hover:text-gray-600">
              <img src={phone} className="mr-2" alt="" srcSet="" />
              06 17 35 23 56
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-50">
            <nav className="flex flex-col p-4 space-y-4">
              <Link
                to="/"
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>

              {/* Menu déroulant pour les marques en mobile */}
              <div>
                <button
                  onClick={toggleProductsMenu}
                  className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded w-full text-left flex items-center justify-between"
                >
                  Marques
                  <ChevronDown className={`w-5 h-5 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProductsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {isLoading ? (
                      <div className="p-2 text-gray-500">Chargement...</div>
                    ) : error ? (
                      <div className="p-2 text-red-500">{error}</div>
                    ) : (
                      <>
                        {brands.length > 0 ? (
                          brands.map((brand) => (
                            <button
                              key={brand.id || brand.name}
                              onClick={() => handleBrandClick(brand.name)}
                              className="block w-full text-left p-2 text-custcolor hover:bg-gray-100 rounded"
                            >
                              {brand.name}
                            </button>
                          ))
                        ) : (
                          <div className="p-2 text-gray-500">Aucune marque disponible</div>
                        )}
                        <Link
                          to="/product"
                          className="block p-2 text-custcolor hover:bg-gray-100 rounded font-semibold"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Toutes les marques
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* <a
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  scrollToSection(Apropos);
                  setIsMenuOpen(false);
                }}
              >
                À Propos
              </a> */}
              <a
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  scrollToSection(Contact);
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </a>
              <a
                href="tel:0617352356"
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded flex items-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                06 17 35 23 56
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default ResponsiveHeader;