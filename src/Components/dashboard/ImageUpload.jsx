import React, { useEffect, useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ImageUpload = ({ onUpload, previewUrl, imageFile }) => {
  const [preview, setPreview] = useState(previewUrl || null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

  const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

  const validateImage = (file) => {
    if (!file) return "No file selected.";

    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
      fileName.endsWith(ext)
    );

    // Check MIME type
    const hasValidMimeType = ALLOWED_TYPES.includes(file.type);

    if (!hasValidExtension || !hasValidMimeType) {
      return "Only JPG, PNG, and WebP images are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be 5MB or less.";
    }
    return null;
  };

  const createPreview = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        setPreview(event.target.result);
        resolve();
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    setError("");
    const selectedFile = e.target.files[0];

    const validationError = validateImage(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Create preview
      createPreview(selectedFile);

      // Update state and notify parent
      setFile(selectedFile);
      onUpload(selectedFile);
    } catch (err) {
      setError("Error processing image. Please try again.");
      console.error("Error handling file:", err);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFile(null);
    onUpload(null);
  };

  // Sync with parent component
  useEffect(() => {
    if (previewUrl !== undefined) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  useEffect(() => {
    setFile(imageFile);
  }, [imageFile]);

  useEffect(() => {
    if (file || imageFile) {
      onUpload(file || imageFile);
    }
  }, [file, imageFile, onUpload]);

  return (
    <div className="space-y-4 my-4">
      {!preview && (
        <label className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition duration-200">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <PhotoIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600">
            Cliquez pour télécharger une image
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WebP jusqu'à 5MB</p>
        </label>
      )}

      {preview && (
        <div className="relative w-full h-80">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
