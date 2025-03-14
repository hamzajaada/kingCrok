import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le numéro de téléphone est requis';
    }
    
    if (!formData.sujet.trim()) {
      newErrors.sujet = 'Le sujet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#767264] mb-4">Nous contacter</h1>
        <p className="text-gray-600">
          Une question sur nos produits? Une demande de devis ?
          <br />
          N'hésitez pas à nous envoyer un message via le formulaire ci-dessous !
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className={`w-full p-3 border ${errors.nom ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#767264]`}
          />
          {errors.nom && <p className="mt-1 text-red-500 text-sm">{errors.nom}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#767264]`}
          />
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
            className={`w-full p-3 border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#767264]`}
          />
          {errors.telephone && <p className="mt-1 text-red-500 text-sm">{errors.telephone}</p>}
        </div>

        <div>
          <input
            type="text"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            placeholder="Sujet"
            className={`w-full p-3 border ${errors.sujet ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#767264]`}
          />
          {errors.sujet && <p className="mt-1 text-red-500 text-sm">{errors.sujet}</p>}
        </div>

        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="5"
            className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#767264]`}
          />
          {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#767264] text-white py-3 px-6 rounded-md hover:bg-[#5d5a50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#767264]"
        >
          ENVOYER
        </button>
      </form>
    </div>
  );
};

export default ContactForm;