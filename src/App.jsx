import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import DetailProduct from "./pages/DetailProduct";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/detailProduct/:id" element={<DetailProduct/>} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
        {/* Route 404 - doit toujours être la dernière */}
  <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
