import { Dialog } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import api from "../../Api/api";

export default function BrandsManager() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // API Functions
  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("brands");
      setBrands(response.data);
      setError(null);
    } catch (err) {
      setError("Échec de la récupération des marques. Veuillez réessayer.");
      console.error("Erreur lors de la récupération des marques:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addBrand = async () => {
    try {
      const response = await api.post("brands", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      setBrands([...brands, response.data]);
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Échec de l'ajout de la marque. Veuillez réessayer.");
      console.error("Erreur lors de l'ajout de la marque:", err);
    }
  };

  const updateBrand = async () => {
    try {
      const response = await api.put(`brands/${selectedBrand.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      setBrands(
        brands.map((brand) =>
          brand.id === selectedBrand.id ? response.data : brand
        )
      );
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      setError("Échec de la mise à jour de la marque. Veuillez réessayer.");
      console.error("Erreur lors de la mise à jour de la marque:", err);
    }
  };

  const deleteBrand = async () => {
    try {
      await api.delete(`brands/${selectedBrand.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
      setBrands(brands.filter((brand) => brand.id !== selectedBrand.id));
      setIsDeleteModalOpen(false);
      setSelectedBrand(null);
    } catch (err) {
      setError("Failed to delete brand. Please try again.");
      console.error("Error deleting brand:", err);
    }
  };

  // Helper functions
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setSelectedBrand(null);
  };

  const openEditModal = (brand) => {
    setSelectedBrand(brand);
    setFormData({ name: brand.name });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (brand) => {
    setSelectedBrand(brand);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des marques</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Ajouter une marque
        </button>
      </div>
      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      {/* État de chargement */}
      {isLoading ? (
        <div className="bg-white p-6 rounded-lg ">
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      ) : (
        /* Tableau des marques */
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left border-b">
              <th className="px-4 py-4 text-left text-base font-medium">
                Nom de la marque
              </th>
              <th className="px-4 py-4 text-left text-base font-medium">
                Produits
              </th>
              <th className="px-4 py-4 text-left text-base font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center text-gray-500">
                  Aucune marque trouvée. Ajoutez une nouvelle marque pour
                  commencer.
                </td>
              </tr>
            ) : (
              brands.map((brand) => (
                <tr key={brand.id} className="">
                  <td className="px-4 py-4 text-left text-base">
                    {brand.name}
                  </td>
                  <td className="px-4 py-4 text-left text-base">
                    {brand.products_count || 0}
                  </td>
                  <td className="px-4 py-3 flex gap-6">
                    <button
                      onClick={() => openEditModal(brand)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(brand)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {/* Modal d'ajout de marque */}
      <Dialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Ajouter une nouvelle marque
            </Dialog.Title>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Nom de la marque
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="Entrez le nom de la marque"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={addBrand}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                Ajouter
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Modal de modification de marque */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Modifier la marque
            </Dialog.Title>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Nom de la marque
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={updateBrand}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
              >
                Mettre à jour
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* Modal de confirmation de suppression */}
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
              Êtes-vous sûr de vouloir supprimer "{selectedBrand?.name}" ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={deleteBrand}
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
