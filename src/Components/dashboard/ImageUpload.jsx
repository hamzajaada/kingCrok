import React, { useEffect, useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ImageUpload = ({ onUpload, previewUrl }) => {
  const [preview, setPreview] = useState(previewUrl || null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  useEffect(() => {
    // Sets the initial preview from the provided previewUrl prop
    setPreview(previewUrl);
  }, [previewUrl]);

  const handleFileChange = (e) => {
    setError("");
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be 5MB or less.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);

    setFile(selectedFile);
    onUpload(selectedFile);
  };

  const removeImage = () => {
    setPreview(null);
    setFile(null);
    onUpload(null);
  };

  return (
    <div className="space-y-4">
      {/* File Input */}
      {!preview && (
        <label className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
        </label>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="relative w-32 h-32">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUpload;
