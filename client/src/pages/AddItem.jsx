import React, { useState } from "react";

const ITEM_TYPES = ["Shirt", "Pant", "Shoes", "Sports Gear", "Other"];

export default function AddItemForm({ onItemAdded }) {
  const [form, setForm] = useState({
    name: "",
    type: ITEM_TYPES[0],
    description: "",
    coverImage: null,
    coverImagePreview: "",
    additionalImages: [],
    additionalImagesPreview: [],
  });
  const [success, setSuccess] = useState("");

  // Handle text/select input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle cover image file and preview
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          coverImage: reader.result,
          coverImagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle additional images and previews
  const handleAdditionalImages = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((images) => {
      setForm((prev) => ({
        ...prev,
        additionalImages: images,
        additionalImagesPreview: images,
      }));
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemData = {
      name: form.name,
      type: form.type,
      description: form.description,
      coverImage: form.coverImage,
      additionalImages: form.additionalImages,
    };
    const res = await fetch("http://localhost:5000/api/items", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(itemData),
});
    if (res.ok) {
      setSuccess("Item successfully added!");
      setForm({
        name: "",
        type: ITEM_TYPES[0],
        description: "",
        coverImage: null,
        coverImagePreview: "",
        additionalImages: [],
        additionalImagesPreview: [],
      });
      if (onItemAdded) onItemAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
        Add Item
      </h2>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-2 text-center">
          {success}
        </div>
      )}
      <div>
        <label className="block font-semibold mb-1">Item Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Item Type:</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {ITEM_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-1">Item Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Item Cover Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImage}
          required
          className="block w-full"
        />
        {form.coverImagePreview && (
          <img
            src={form.coverImagePreview}
            alt="Cover Preview"
            className="mt-2 h-32 object-contain border rounded"
          />
        )}
      </div>
      <div>
        <label className="block font-semibold mb-1">Item Additional Images:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleAdditionalImages}
          multiple
          className="block w-full"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {form.additionalImagesPreview.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Additional Preview ${idx + 1}`}
              className="h-20 object-contain border rounded"
            />
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
      >
        Add Item
      </button>
    </form>
  );
}
