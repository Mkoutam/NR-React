import React, { useState } from "react";

const ChecklistApp = () => {
  const [checklistItems, setChecklistItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState("");

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      content: "",
      selected: false,
    };
    setChecklistItems([...checklistItems, newItem]);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = checklistItems.filter((item) => item.id !== id);
    setChecklistItems(updatedItems);
  };

  const handleSelectItem = (id) => {
    const updatedItems = checklistItems.map((item) => {
      if (item.id === id) {
        item.selected = !item.selected;
      }
      return item;
    });
    setChecklistItems(updatedItems);
  };

  const handleEditItem = (id) => {
    const selectedItem = checklistItems.find((item) => item.id === id);
    setSelectedItem(selectedItem.id);
    setEditedData(selectedItem.content);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    const updatedItems = checklistItems.map((item) => {
      if (item.id === selectedItem) {
        item.content = editedData;
      }
      return item;
    });
    setChecklistItems(updatedItems);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  return (
    <div>
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {checklistItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => handleSelectItem(item.id)}
            />
            {item.content}
            <button onClick={() => handleEditItem(item.id)}>Edit</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {editMode && (
        <div>
          <input
            type="text"
            value={editedData}
            onChange={(e) => setEditedData(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ChecklistApp;
