import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import api from "../../Api/api";

export default function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      await api.put(
        `command/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
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

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des Commandes</h2>
      </div>
      {/* Message d'Erreur */}
      {error && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-red-500 p-4 text-center">{error}</div>
        </div>
      )}

      {/* Section du Tableau */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Nom d'utilisateur
                </th>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Titre
                </th>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Produit
                </th>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Adresse
                </th>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Téléphone
                </th>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Quantité
                </th>
                <th className="px-4 py-4 text-left text-base font-medium">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td
                    className="px-4 py-4 text-sm hover:text-blue-600  cursor-pointer"
                    onClick={() => handleOpenModal(order)}
                  >
                    {order.name || "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm">{order.title || "N/A"}</td>
                  <td className="px-4 py-4 text-sm">
                    {order.product.name || "N/A"}
                  </td>

                  <td className="px-4 py-4 text-sm">
                    {order.address || "N/A"}
                  </td>

                  <td className="px-4 py-4 text-sm">{order.tele || "N/A"}</td>

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
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmé</option>
                      <option value="delivered">Livré</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                    {updatingOrderId === order.id && (
                      <span className="ml-2 text-gray-500">Mise à jour...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Transition show={isModalOpen} as={Fragment}>
        <Dialog onClose={handleCloseModal} className="relative z-50">
          {/* Arrière-plan */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          {/* Panneau Modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-semibold">
                    Détails de la Commande
                  </Dialog.Title>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {selectedOrder && (
                  <div className="space-y-4">
                    {/* Informations Client */}
                    <div>
                      <h3 className="font-medium mb-2">Informations Client</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <p>
                          <span className="text-gray-600">Nom:</span>{" "}
                          {selectedOrder.name}
                        </p>
                        <p>
                          <span className="text-gray-600">Téléphone:</span>{" "}
                          {selectedOrder.tele}
                        </p>
                        <p>
                          <span className="text-gray-600">Titre:</span>{" "}
                          {selectedOrder.title}
                        </p>
                        <p>
                          <span className="text-gray-600">Adresse:</span>{" "}
                          {selectedOrder.address}
                        </p>
                      </div>
                    </div>
                    {/* Informations Produit */}
                    <div>
                      <h3 className="font-medium mb-2">Informations Produit</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <p>
                          <span className="text-gray-600">Produit:</span>{" "}
                          {selectedOrder.product.name}
                        </p>
                        <p>
                          <span className="text-gray-600">Quantité:</span>{" "}
                          {selectedOrder.quantity}
                        </p>
                        <p>
                          <span className="text-gray-600">Prix:</span> €
                          {selectedOrder.price}
                        </p>
                        <p>
                          <span className="text-gray-600">Total:</span> €
                          {(
                            selectedOrder.price * selectedOrder.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Statut */}
                    <div>
                      <h3 className="font-medium mb-2">
                        Statut de la Commande
                      </h3>
                      <select
                        value={selectedOrder.status}
                        onChange={(e) =>
                          handleStatusChange(selectedOrder.id, e.target.value)
                        }
                        disabled={updatingOrderId === selectedOrder.id}
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="delivered">Livré</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
