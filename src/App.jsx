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
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/detailProduct" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
