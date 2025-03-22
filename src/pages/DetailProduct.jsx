import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/layout/Header";
import Product from "../asset/images/product1.webp";
import Footer from "../Components/layout/Footer";
import { X, ChevronRight, Plus, Minus } from "lucide-react";
import api from "../Api/api";

export default function DetailProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postal: "",
    address: "",
    subject: "",
    message: "",
    quantity: 1,
    price: 11,
    status: "pending",
    product_id: ""
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        console.log("before");
        
        const response = await api.get(`products/${id}`);
        setProductData(response.data);
        setFormData(prevState => ({
          ...prevState,
          product_id: id
        }));
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des données du produit.");
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  // Empêcher le défilement du body lorsque la popup est ouverte
  useEffect(() => {
    if (showQuoteForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showQuoteForm]);

  const toggleQuoteForm = () => {
    setShowQuoteForm(!showQuoteForm);
  };

  const closeOnBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowQuoteForm(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleQuantityChange = (amount) => {
    setFormData(prevState => ({
      ...prevState,
      quantity: Math.max(1, prevState.quantity + amount)
    }));
  };

  const handleQuantityInput = (e) => {
    const value = parseInt(e.target.value) || 1;
    setFormData(prevState => ({
      ...prevState,
      quantity: Math.max(1, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Préparer les données pour l'API selon le format montré dans Postman
      const commandData = {
        name: formData.name,
        product_id: formData.product_id,
        tele: formData.phone,
        email: formData.email,
        code_postal: formData.postal,
        address: formData.address,
        message: formData.message,
        title: formData.subject,
        price: formData.price,
        quantity: formData.quantity,
        status: formData.status
      };
      
      console.log("Données à envoyer:", commandData);
      
      // Envoyer les données à l'API
      const response = await axios.post(
        "https://croquette.sa-pub.com/api/command",
        commandData
      );
      
      console.log("Réponse de l'API:", response.data);
      
      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        postal: "",
        address: "",
        subject: "",
        message: "",
        quantity: 1,
        price: 11,
        status: "pending",
        product_id: id
      });
      
      // Fermer le formulaire
      setShowQuoteForm(false);
      
      // Afficher un message de confirmation
      alert("Commande envoyée avec succès pour le produit " + productData.name);
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!productData) {
    return <div className="text-center py-8">Aucune donnée disponible pour ce produit.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Breadcrumb and product title */}
      <div className="w-full bg-backgroundgray py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-3 md:mb-0">
              <h1 className="text-custcolor font-bold text-2xl md:text-3xl">{productData.name}</h1>
              <p className="text-custcolor font-semibold text-base">Sacs de {productData.weight} kg</p>
            </div>
            
            <div className="flex items-center text-gracolor text-sm md:text-base">
              <span>Produit</span>
              <ChevronRight size={16} className="mx-1" />
              <span>{productData.brand.name}</span>
              <ChevronRight size={16} className="mx-1" />
              <span className="font-medium">{productData.name}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Content */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img 
                src={`${api.imageUrl}${productData.image_url}`} 
                className="w-full h-auto object-contain" 
                alt={productData.name} 
              />
            </div>
            <button
              type="button"
              onClick={toggleQuoteForm}
              className="w-full bg-[#767264] font-semibold uppercase tracking-[2px] text-white py-4 px-6 rounded-md hover:bg-[#5d5a50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#767264]"
            >
              Demander un devis
            </button>
          </div>
          
          {/* Product Details Section */}
          <div className="lg:w-1/2">
            {/* Tabs for mobile */}
            <div className="flex border-b mb-6 overflow-x-auto scrollbar-hide lg:hidden">
              <button 
                className={`py-2 px-4 font-medium ${activeTab === "description" ? "border-b-2 border-custcolor text-custcolor" : "text-gray-500"}`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === "composition" ? "border-b-2 border-custcolor text-custcolor" : "text-gray-500"}`}
                onClick={() => setActiveTab("composition")}
              >
                Composition
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === "advice" ? "border-b-2 border-custcolor text-custcolor" : "text-gray-500"}`}
                onClick={() => setActiveTab("advice")}
              >
                Conseils
              </button>
              <button 
                className={`py-2 px-4 font-medium ${activeTab === "analysis" ? "border-b-2 border-custcolor text-custcolor" : "text-gray-500"}`}
                onClick={() => setActiveTab("analysis")}
              >
                Analyse
              </button>
            </div>
            
            {/* Desktop view - all content visible */}
            <div className="space-y-6">
              {/* Description */}
              <div className={activeTab === "description" ? "block" : "hidden lg:block"}>
                <h2 className="text-xl font-bold text-gracolor mb-2">Description :</h2>
                <p className="text-gray-700 mb-4">{productData.description}</p>
              </div>
              
              {/* Composition */}
              <div className={activeTab === "composition" ? "block" : "hidden lg:block"}>
                <h2 className="text-xl font-bold text-gracolor mb-2">COMPOSITION :</h2>
                <p className="text-gray-700 mb-4">{productData.composition}</p>
              </div>
              
              {/* Advice */}
              <div className={activeTab === "advice" ? "block" : "hidden lg:block"}>
                <h2 className="text-xl font-bold text-gracolor mb-2">Conseil :</h2>
                <p className="text-gray-700 mb-4">{productData.conseil}</p>
                
                <h2 className="text-xl font-bold text-gracolor mb-2">Conditionnement :</h2>
                <p className="text-gray-700 mb-4">{productData.conditionnement}</p>
              </div>
              
              {/* Analysis */}
              <div className={activeTab === "analysis" ? "block" : "hidden lg:block"}>
                <h2 className="text-xl font-bold text-gracolor mb-2">Analyse moyenne brute :</h2>
                <div className="grid grid-cols-2 gap-2">
                  {productData.product_info.map((item, index) => (
                    <div key={index} className="flex justify-between py-1 border-b border-gray-100">
                      <span className="font-medium">{item.type}</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Popup de demande de devis avec défilement */}
      {showQuoteForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 md:p-6"
          onClick={closeOnBackdropClick}
        >
          <div className="bg-white rounded-lg w-full max-w-lg mx-auto relative animate-fadeIn max-h-[90vh] flex flex-col">
            <div className="p-4 border-b sticky top-0 bg-white rounded-t-lg z-10 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-custcolor">Demander un devis</h2>
              <button 
                className="text-gray-500 hover:text-gray-700 p-1"
                onClick={toggleQuoteForm}
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 flex-grow">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                  <input 
                    id="product"
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                    readOnly
                    value={productData.name}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input 
                      id="name"
                      type="text" 
                      placeholder="Votre nom" 
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      placeholder="votre@email.com" 
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input 
                      id="phone"
                      type="tel" 
                      placeholder="Votre numéro" 
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="postal" className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                    <input 
                      id="postal"
                      type="text" 
                      placeholder="Code postal" 
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                      required
                      value={formData.postal}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input 
                    id="address"
                    type="text" 
                    placeholder="Adresse" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <input 
                    id="subject"
                    type="text" 
                    placeholder="Sujet de votre demande" 
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Prix</label>
                    <input 
                      id="price"
                      type="number" 
                      placeholder="Prix" 
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                      required
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div> */}
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                    <div className="flex items-center">
                      <button 
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 bg-gray-200 rounded-l hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        id="quantity"
                        type="number" 
                        min="1"
                        className="w-full p-3 border-y border-gray-300 text-center focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                        required
                        value={formData.quantity}
                        onChange={handleQuantityInput}
                      />
                      <button 
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 bg-gray-200 rounded-r hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message"
                    placeholder="Votre message..." 
                    className="w-full p-3 border border-gray-300 rounded h-32 focus:ring-2 focus:ring-custcolor focus:border-transparent" 
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-[#767264] text-white py-3 px-6 font-semibold uppercase tracking-[2px] rounded-md hover:bg-[#5d5a50] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#767264]"
                  >
                    ENVOYER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}