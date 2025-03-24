import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import api from "../../Api/api";
import OrdersList from "./OrdersList";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("command", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to load orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    fetchProducts();

    return () => {
      setProducts([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits. Veuillez réessayer.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="">
          <ProductsList
            products={products}
            isLoading={loading}
            isError={error}
          />
        </div>
        <div className="mt-12">
          <OrdersList orders={orders} isLoading={loading} isError={error} />
        </div>
      </div>
    </>
  );
}
