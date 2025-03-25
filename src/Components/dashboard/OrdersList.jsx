import { useState, useEffect } from "react";
import api from "../../Api/api";
import { Link } from "react-router-dom";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

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
        setOrders(response.data.data);
        setOrders(
          Array.isArray(response.data)
            ? response.data
            : response.data.data || []
        );

        setError(null);
      } catch (err) {
        setError("Failed to load orders. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white rounded-lg ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste des commandes</h2>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-white p-6 rounded-lg">
          <div className="text-red-500 p-4 text-center">{error}</div>
        </div>
      )}

      {/* Section du Tableau */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg  overflow-hidden">
            {orders?.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>Aucune commande trouvée.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b hover:bg-gray-50 ">
                      <th className="px-4 py-4 text-left text-base font-medium">
                        Nom d'utilisateur
                      </th>

                      <th className="px-4 py-4 text-left text-base font-medium">
                        Produit
                      </th>
                      <th className="px-4 py-4 text-left text-base font-medium">
                        Adresse
                      </th>

                      <th className="px-4 py-4 text-left text-base font-medium">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50 ">
                        <td className="px-4 py-4 text-sm">
                          {order.name || "N/A"}
                        </td>

                        <td className="px-4 py-4 text-sm">
                          {order.product.name || "N/A"}
                        </td>

                        <td className="px-4 py-4 text-sm">
                          {order.address || "N/A"}
                        </td>

                        <td className="px-4 py-4 text-sm">
                          <select
                            value={order.status}
                            // onChange={(e) =>
                            //   handleStatusChange(order.id, e.target.value)
                            // }
                            // disabled={updatingOrderId === order.id}
                            disabled={true}
                            className={`px-3 py-1 rounded-full text-sm 
                        ${getStatusColor(order.status)} 
                        ${
                          updatingOrderId === order.id
                            ? "opacity-90"
                            : "cursor-pointer"
                        }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {/* {updatingOrderId === order.id && (
                          <span className="ml-2 text-gray-500">
                            Updating...
                          </span>
                        )} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              to="/dashboard/orders"
              className="bg-customGreen text-white px-4 py-2 rounded-md shadow 
          bg-gray-700 hover:bg-gray-500 transition duration-300"
            >
              Tous les commandes
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
