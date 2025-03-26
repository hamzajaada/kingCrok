import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ProductPage = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost/products.php") // Adjust URL accordingly
      .then((res) => res.json())
      .then((data) => setProduct(data[0])); // Assuming first product
  }, []);

  return (
    <div className="p-4">
      {product ? (
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <MarkdownPreview
            source={product.description}
            className="prose max-w-none"
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductPage;
