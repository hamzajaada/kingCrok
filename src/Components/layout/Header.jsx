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
    if (!isMenuOpen) {
      setIsProductsOpen(false);
    }
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen(!isProductsOpen);
    if (!isProductsOpen && brands.length === 0 && !isLoading) {
      fetchBrands();
    }
  };

  const fetchBrands = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://croquette.sa-pub.com/api/brands");
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setBrands(data);
    } catch (err) {
      console.error("Error fetching brands:", err);
      setError("Failed to load brands");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBrandClick = (brandName) => {
    console.log(`Navigating to brand: ${brandName}`);
    navigate(`/product?brand=${encodeURIComponent(brandName)}`);
    setIsProductsOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full shadow-lg bg-white sticky top-0 z-40">
      <div className="px-4 lg:px-48 h-20 lg:h-32">
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <div className="w-12 lg:w-16 h-12 lg:h-16">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logo} alt="Logo" className="w-full h-full" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            <Link to="/" className="text-custcolor font-bold text-lg hover:text-gray-600">
              Accueil
            </Link>

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
                      {brands.map((brand) => (
                        <button
                          key={brand.id || brand.name}
                          onClick={() => handleBrandClick(brand.name)}
                          className="block w-full text-left px-4 py-2 text-custcolor hover:bg-gray-100"
                        >
                          {brand.name}
                        </button>
                      ))}
                      <Link 
                        to="/product" 
                        className="block px-4 py-2 text-custcolor hover:bg-gray-100 font-semibold"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        Toutes les marques
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection(Contact)}
              className="text-custcolor font-bold text-lg hover:text-gray-600"
            >
              Contact
            </button>

            <a href="tel:0617352356" className="text-custcolor font-bold text-lg flex items-center hover:text-gray-600">
              <img src={phone} className="mr-2" alt="Téléphone" />
              06 17 35 23 56
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-20 bg-white z-50 overflow-y-auto">
            <nav className="flex flex-col p-4 space-y-3">
              <Link
                to="/"
                className="text-custcolor font-bold text-lg p-3 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>

              <div ref={productMenuRef}>
                <button
                  onClick={toggleProductsMenu}
                  className="text-custcolor font-bold text-lg p-3 hover:bg-gray-100 rounded-lg w-full text-left flex items-center justify-between"
                >
                  <span>Marques</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProductsOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {isLoading ? (
                      <div className="p-3 text-gray-500">Chargement...</div>
                    ) : error ? (
                      <div className="p-3 text-red-500">{error}</div>
                    ) : (
                      <>
                        {brands.map((brand) => (
                          <div
                            key={brand.id || brand.name}
                            onClick={() => handleBrandClick(brand.name)}
                            className="block w-full text-left p-3 text-custcolor hover:bg-gray-100 rounded-lg cursor-pointer"
                          >
                            {brand.name}
                          </div>
                        ))}
                        <Link
                          to="/product"
                          className="block p-3 text-custcolor hover:bg-gray-100 rounded-lg font-semibold"
                          onClick={() => {
                            setIsProductsOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          Toutes les marques
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  scrollToSection(Contact);
                  setIsMenuOpen(false);
                }}
                className="text-custcolor font-bold text-lg p-3 hover:bg-gray-100 rounded-lg text-left"
              >
                Contact
              </button>

              <a
                href="tel:0617352356"
                className="text-custcolor font-bold text-lg p-3 hover:bg-gray-100 rounded-lg flex items-center"
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