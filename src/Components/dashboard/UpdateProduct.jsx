import { useState, useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import ImageUpload from "./ImageUpload";
import api from "../../Api/api";

export default function UpdateProduct({ product }) {
  const [brands, setBrands] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [form, setForm] = useState({
  //   ...product,
  //   product_info: product?.product_info ?? [],
  // });

  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    composition: product?.composition || "",
    conseil: product?.conseil || "",
    conditionnement: product?.conditionnement || "",
    image: null,
    brand_id: product?.brand_id || "",
    product_info: product?.product_info || [],
  });

  // Fetch brand options on mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.get("brands");
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const handleProductInfoChange = (index, key, value) => {
    const updatedProductInfo = [...form.product_info];
    updatedProductInfo[index][key] = value;
    setForm({ ...form, product_info: updatedProductInfo });
  };

  const addProductInfo = () => {
    setForm({
      ...form,
      product_info: [...form.product_info, { type: "", value: "" }],
    });
  };

  const removeProductInfo = (index) => {
    const updatedProductInfo = form.product_info.filter((_, i) => i !== index);
    setForm({ ...form, product_info: updatedProductInfo });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate form data FOR UPDATE
  //   if (product) {
  //     const requiredFields = [
  //       "name",
  //       "description",
  //       "brand_id",
  //       "product_info",
  //     ];
  //     for (const field of requiredFields) {
  //       if (
  //         !form[field] ||
  //         (Array.isArray(form[field]) && form[field].length === 0) ||
  //         form[field] === ""
  //       ) {
  //         console.error(`Missing required field: ${field}`);
  //         return;
  //       }
  //     }

  //     // Validate product_info contents
  //     if (form.product_info.some((info) => !info.type || !info.value)) {
  //       console.error("All product info fields must be filled");
  //       return;
  //     }

  //     // Image validation: allow either existing image_url or new image file
  //     if (!form.image && !product.image_url) {
  //       console.error("Product must have an image");
  //       return;
  //     }
  //   }

  //   setIsSubmitting(true);
  //   const formData = new FormData();

  //   if (form.image) {
  //     formData.append("image", form.image);
  //   }

  //   // Append fields to FormData
  //   for (const key in form) {
  //     if (key === "product_info") {
  //       formData.append(key, JSON.stringify(form[key])); // Convert array to JSON string
  //     }
  //     // else if (key === "image" && form.image) {
  //     //   formData.append("image", form.image);
  //     // }
  //     else {
  //       formData.append(key, form[key]);
  //     }
  //   }

  //   // If there's a new image file, append it
  //   // If not, the existing image will remain unchanged on the server
  //   if (form.image instanceof File) {
  //     formData.append("image", form.image);
  //   }

  //   try {
  //     const response = await api.post(
  //       `products/update/${product.id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  //         },
  //       }
  //     );

  //     console.log("Product updated:", response.data);

  //     // Optionally, redirect or show a success message
  //     window.location.href = "/dashboard/products";
  //   } catch (error) {
  //     console.error("Error saving product:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //     // Emty all fields
  //     if (!product) {
  //       setForm({
  //         name: "",
  //         description: "",
  //         composition: "",
  //         conseil: "",
  //         conditionnement: "",
  //         image: null,
  //         brand_id: "",
  //         product_info: [],
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append all form fields except image
      Object.keys(form).forEach((key) => {
        if (key === "product_info") {
          formData.append(key, JSON.stringify(form[key]));
        } else if (key !== "image") {
          formData.append(key, form[key]);
        }
      });

      // Handle image
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      const url = `products/update/${product.id}`;

      const response = await api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      console.log(
        product ? "Product updated:" : "Product created:",
        response.data
      );
      window.location.href = "/dashboard/products";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">
        Modifier le produit
      </h2>
      <input
        type="text"
        placeholder="Nom du produit"
        className="border p-2 rounded w-full mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border p-2 rounded w-full mb-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Sélection de la marque */}
      <select
        className="border p-2 rounded w-full mb-2"
        value={form.brand_id}
        onChange={(e) => setForm({ ...form, brand_id: e.target.value })}
      >
        <option value="">Sélectionner une marque</option>
        {brands?.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Conseil"
        className="border p-2 rounded w-full mb-2"
        value={form.conseil}
        onChange={(e) => setForm({ ...form, conseil: e.target.value })}
      />

      <input
        type="text"
        placeholder="Conditionnement"
        className="border p-2 rounded w-full mb-2"
        value={form.conditionnement}
        onChange={(e) => setForm({ ...form, conditionnement: e.target.value })}
      />
      <textarea
        placeholder="Composition"
        className="border p-2 rounded w-full mb-2"
        value={form.composition}
        onChange={(e) => setForm({ ...form, composition: e.target.value })}
      />

      {/* Informations du produit */}
      <div className="border p-3 rounded mb-2">
        <h3 className="font-bold mb-2">Informations du produit</h3>
        {form.product_info.map((info, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Type (ex: Protéines)"
              className="border p-2 rounded w-full"
              value={info.type}
              onChange={(e) =>
                handleProductInfoChange(index, "type", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Valeur (ex: 22%)"
              className="border p-2 rounded w-full"
              value={info.value}
              onChange={(e) =>
                handleProductInfoChange(index, "value", e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeProductInfo(index)}
              className="text-red-500 hover:text-red-700"
              aria-label={`Supprimer ${info.name}`}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addProductInfo}
          className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center gap-1 hover:bg-blue-600 transition-colors"
          aria-label="Ajouter une information"
        >
          <PlusIcon className="w-4 h-4" />
          Ajouter une info
        </button>
      </div>

      {/* Téléchargement d'image */}
      <ImageUpload
        onUpload={(file) => {
          if (file !== form.image) {
            setForm((prev) => ({ ...prev, image: file }));
          }
        }}
        previewUrl={
          product.image_url ? `${api.imageUrl}${product.image_url}` : null
        }
        imageFile={form.image}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Mise à jour..." : "Mettre à jour le produit"}
      </button>
    </form>
  );
}
