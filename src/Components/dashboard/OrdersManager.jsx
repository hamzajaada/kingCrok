import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://croquette.sa-pub.com/api/command";

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
        const response = await axios.get(API_URL);
        setOrders(response.data);
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

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    setError(null);
    const originalOrders = [...orders];

    try {
      // Optimistic update
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      await axios.put(`${API_URL}/${orderId}`, { status: newStatus });
    } catch (err) {
      setError("Failed to update order status. Please try again.");
      // Rollback on error
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: originalOrders.find((o) => o.id === orderId).status,
              }
            : order
        )
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Orders Management</h2>
      </div>
      {/* Error Message */}
      {error && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-red-500 p-4 text-center">{error}</div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {error && (
            <div className="text-red-500 p-4 text-center mb-4">{error}</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    User Name
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    title
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Product
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    address
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    telephone
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Quantity
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm">{order.name || "N/A"}</td>
                    <td className="px-4 py-4 text-sm">
                      {order.title || "N/A"}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      {order.product.name || "N/A"}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {order.address || "N/A"}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {parseFloat(order.address || "N/A")}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {parseFloat(order.quantity || "N/A")}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        disabled={updatingOrderId === order.id}
                        className={`px-3 py-1 rounded-full text-sm 
                        ${getStatusColor(order.status)} 
                        ${
                          updatingOrderId === order.id
                            ? "opacity-50"
                            : "cursor-pointer"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {updatingOrderId === order.id && (
                        <span className="ml-2 text-gray-500">Updating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && !isLoading && (
            <div className="text-center py-6 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
