import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function ProductsList({
  products,
  isLoading,
  onEdit,
  onDelete,
}) {
  return (
    <>
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
                {products?.map((product) => (
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
                        onClick={() => onEdit(product)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(product)}
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
    </>
  );
}
