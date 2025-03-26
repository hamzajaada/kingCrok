import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

export default function ProductsList({ products, isLoading, isError }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste des produits </h2>
      </div>

      {/* Error Message */}
      {isError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{isError}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !products?.length ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden">
          {products?.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>
                Aucun produit trouvé. Ajoutez un nouveau produit pour commencer.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b hover:bg-gray-50 ">
                    <th className="px-4 py-4 text-left text-base font-medium">
                      Nom de produit
                    </th>
                    <th className="px-4 py-4 text-left text-base font-medium">
                      Description
                    </th>
                    <th className="px-4 py-4 text-left text-base font-medium">
                      Composition
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {products?.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50 ">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Link
              to="/dashboard/products"
              className="bg-customGreen text-white px-4 py-2 rounded-md shadow 
          bg-gray-700 hover:bg-gray-500 transition duration-300"
            >
              Tous les produits
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
