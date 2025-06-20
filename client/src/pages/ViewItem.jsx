import React, { useEffect, useState } from "react";

export default function ViewItemsPage() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md"
            onClick={() => setSelected(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              className="w-full h-48 object-contain mb-2"
            />
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.type}</p>
          </div>
        ))}
      </div>
      {/* Modal for details */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{selected.name}</h2>
                <button
                  className="text-gray-500"
                  onClick={() => setSelected(null)}
                >
                  ✕
                </button>
              </div>
              <img
                src={selected.coverImage}
                alt={selected.name}
                className="w-full max-h-96 object-contain my-4"
              />
              <div className="space-y-2">
                <p>
                  <strong>Type:</strong> {selected.type}
                </p>
                <p>
                  <strong>Description:</strong> {selected.description}
                </p>
              </div>
              <div className="flex overflow-x-auto space-x-2 py-2">
                {selected.additionalImages &&
                  selected.additionalImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Additional ${idx + 1}`}
                      className="h-24 object-contain border rounded"
                    />
                  ))}
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Enquire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
