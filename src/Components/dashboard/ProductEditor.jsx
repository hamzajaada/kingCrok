import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const ProductEditor = ({ initialValue, onChange }) => {
  const [markdown, setMarkdown] = useState(initialValue || "");

  const handleChange = (value) => {
    setMarkdown(value);
    onChange(value);
  };

  useEffect(() => {
    setMarkdown(initialValue || "");
  }, [initialValue]);

  return (
    <div className="w-full">
      <MDEditor
        value={markdown}
        onChange={handleChange}
        preview="edit"
        height={300}
        className="w-full bg-gray-100 text-gray-900"
      />
    </div>
  );
};

export default ProductEditor;
