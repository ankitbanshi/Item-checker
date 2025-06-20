import React, { useState } from "react";
import AddItemForm from "./pages/AddItem"
import ViewItemsPage from "./pages/ViewItem"

export default function App() {
  const [view, setView] = useState("view"); // "add" or "view"
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <nav className="flex justify-center gap-4 p-4 bg-gray-100">
        <button
          className={`px-4 py-2 rounded ${view === "add" ? "bg-green-500 text-white" : "bg-white"}`}
          onClick={() => setView("add")}
        >
          Add Item
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "view" ? "bg-green-500 text-white" : "bg-white"}`}
          onClick={() => setView("view")}
        >
          View Items
        </button>
      </nav>
      {view === "add" ? (
        <AddItemForm onItemAdded={() => setRefresh((r) => !r)} />
      ) : (
        <ViewItemsPage key={refresh} />
      )}
    </div>
  );
}
