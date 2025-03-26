import { useState, useEffect, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import UpdateProduct from "./UpdateProduct";
import api from "../../Api/api";
import AddProduct from "./AddProduct";
import Pagination from "../Pagination";
import MDEditor from "@uiw/react-md-editor";

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const fetchBrands = async () => {
    try {
      const response = await api.get("brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchProducts = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await api.get(`products?page=${page}`);
      setProducts(response.data.data || response.data);
      setTotalPages(response.data.last_page);

      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des produits. Veuillez réessayer.");
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch brands && products on component mount
  useEffect(() => {
    fetchBrands();
    fetchProducts(page);
    // Cleanup function to reset state
    return () => {
      setProducts([]);
      setSelectedProduct(null);
      setIsLoading(false);
      setError(null);
    };
  }, [page, fetchProducts]);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
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
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white overflow-hidden">
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
                    <td className="prose max-w-none px-4 py-4 text-sm text-gray-900">
                      {/* {product.description?.length >= 30
                        ? product.description.substring(0, 30) + "..."
                        : product.description} */}
                      <MDEditor.Markdown
                        className="bg-white text-black"
                        source={
                          product.description?.length >= 30
                            ? product.description.substring(0, 30) + "..."
                            : product.description
                        }
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      {product.composition?.length >= 30
                        ? product.composition.substring(0, 30) + "..."
                        : product.composition}
                    </td>
                    <td className="px-4 py-4 text-sm flex gap-6">
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

          <div className="m-2 flex justify-end">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
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
          <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold mb-4"></Dialog.Title>
            {selectedProduct && (
              <>
                {selectedProduct.id ? (
                  <UpdateProduct product={selectedProduct} />
                ) : (
                  <AddProduct product={selectedProduct} />
                )}
              </>
            )}
            {/* <UpdateProduct product={selectedProduct} /> */}
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
