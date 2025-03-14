import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import logo   from "../../asset/images/logo.png"
import phone   from "../../asset/images/phone.png"
const ResponsiveHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full shadow-lg">
      <div className="px-4 lg:px-48 h-20 lg:h-32">
        {/* Main header container */}
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <div className="w-12 lg:w-16 h-12 lg:h-16">
            <img src={logo} alt="Logo" className="w-full h-full" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5">
            <a href="#" className="text-custcolor font-bold text-lg hover:text-gray-600">
              Accueil
            </a>
            <a href="#" className="text-custcolor font-bold text-lg hover:text-gray-600">
              Produits
            </a>
            <a href="#" className="text-custcolor font-bold text-lg hover:text-gray-600">
              À Propos
            </a>
            <a href="#" className="text-custcolor font-bold text-lg hover:text-gray-600">
              Contact
            </a>
            <a href="tel:0617352356" className="text-custcolor font-bold text-lg flex items-center hover:text-gray-600">
            <img src={phone} className="mr-2" alt="" srcset="" />
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
              <a 
                href="#" 
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
              >
                Accueil
              </a>
              <a 
                href="#" 
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
              >
                Produits
              </a>
              <a 
                href="#" 
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
              >
                À Propos
              </a>
              <a 
                href="#" 
                className="text-custcolor font-bold text-lg p-2 hover:bg-gray-100 rounded"
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