import { useState, useEffect } from "react";
import api from "../../Api/api";

export default function BrandSelect({ value, onChange }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBrands = async () => {
      try {
        const { data } = await api.get("brands", {
          signal: controller.signal,
        });

        setBrands(data);
        setError(null);
      } catch (err) {
        if (!api.isCancel(err)) {
          setError("Erreur lors du chargement des marques");
          console.error("Brands fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        {error} - Veuillez recharger la page
      </div>
    );
  }

  return (
    <div>
      {/* <label className="block text-sm font-medium text-gray-700 mb-1">
        Marque
      </label> */}
      {loading ? (
        <div
          className="animate-pulse bg-gray-200 h-9 rounded-md"
          aria-label="Chargement des marques"
        />
      ) : (
        <select
          name="brand_id"
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          aria-invalid={error ? "true" : "false"}
        >
          <option value="">Sélectionner une marque</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
