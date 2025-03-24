import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import DetailProduct from "./pages/DetailProduct";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./Components/dashboard/";
import ProductsManager from "./Components/dashboard/ProductsManager";
import BrandsManager from "./Components/dashboard/BrandsManager";
import OrdersManager from "./Components/dashboard/OrdersManager";
import RoutePrivate from "./pages/RoutePrivate";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Private Routes */}
        <Route element={<RoutePrivate />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/brands" element={<BrandsManager />} />
            <Route path="/dashboard/orders" element={<OrdersManager />} />
            <Route path="/dashboard/products" element={<ProductsManager />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detailProduct/:id" element={<DetailProduct />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route
          path="/politique-confidentialite"
          element={<PolitiqueConfidentialite />}
        />

        {/* Route 404 - doit toujours être la dernière */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/detailProduct" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
