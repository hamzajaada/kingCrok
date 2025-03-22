import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import ProductForm from "./ProductForm";

// API URL
const API_URL = "https://croquette.sa-pub.com/api/products";

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  console.log(products);

  // Fetch brand options
  const [brands, setBrands] = useState([]);
  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        "https://croquette.sa-pub.com/api/brands"
      );
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    // Cleanup function to reset state
    return () => {
      setProducts([]);
      setSelectedProduct(null);
      setIsLoading(false);
      setError(null);
    };
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits. Veuillez réessayer.");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      setError("Erreur lors de la suppression du produit. Veuillez réessayer.");
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Gestion des Produits</h1>
        <button
          onClick={() => {
            setSelectedProduct({
              name: "",
              description: "",
              composition: "",
              conditionnement: "",
              conseil: "",
              product_infos: [],
              image: null,
              brand_id: "",
              id: null,
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter un Produit
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center py-6">
          <p className="text-gray-500">Chargement des produits...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {products?.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>
                Aucun produit trouvé. Ajoutez un nouveau produit pour commencer.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left border-b">
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Nom
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Description
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Composition
                  </th>
                  <th className="px-4 py-4 text-left text-base font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {product.description?.length >= 30
                        ? product.description.substring(0, 30) + "..."
                        : product.description}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {product.composition?.length >= 30
                        ? product.composition.substring(0, 30) + "..."
                        : product.composition}
                    </td>
                    <td className="px-4 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {selectedProduct ? "Modifier le produit" : "Créer un produit"}
            </Dialog.Title>
            <ProductForm product={selectedProduct} />
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Confirmer la suppression
            </Dialog.Title>

            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer "{selectedProduct?.name}" ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={() =>
                  selectedProduct && deleteProduct(selectedProduct.id)
                }
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
