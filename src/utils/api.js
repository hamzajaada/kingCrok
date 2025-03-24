// src/api.js
import axios from "axios";

const API_URL = "https://croquette.sa-pub.com/api/products";

// Create or update a product using FormData
const sendProductData = async (productData, productId = null) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    for (const key in productData) {
      if (key === "analysis") {
        formData.append(key, JSON.stringify(productData[key])); // Convert analysis array to JSON string
      } else {
        formData.append(key, productData[key]);
      }
    }

    const response = productId
      ? await axios.put(`${API_URL}/${productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return { error: "Failed to process product data" };
  }
};

// Export functions
// export const createProduct = async (productData) =>
//   sendProductData(productData);

// export const updateProduct = async (productId, productData) =>
//   sendProductData(productData, productId);

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    );
    return { error: "Failed to create product" };
  }
};

// Update an existing product
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, updatedData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response?.data || error.message
    );
    return { error: "Failed to update product" };
  }
};

// Upload image
// export const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const response = await axios.post(`${API_URL}/upload`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data; // Expected to return the image URL
//   } catch (error) {
//     console.error(
//       "Error uploading image:",
//       error.response?.data || error.message
//     );
//     return { error: "Failed to upload image" };
//   }
// };
