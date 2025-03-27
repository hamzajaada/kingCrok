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
        height={350}
        className="
        w-full bg-gray-100 text-gray-900
        dark:bg-gray-800 dark:text-white
        prose max-w-none p-2 "
        theme="dark"
        toolbar={{
          bold: true,
          italic: true,
          link: true,
          image: true,
          code: true,
        }}
      />
    </div>
  );
};

export default ProductEditor;
