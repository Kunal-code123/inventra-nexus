import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inventory() {
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    try {
      const newItem = {
        itemName,
        quantity: itemQty,
        category: itemCategory
      };

      await axios.post('http://localhost:5000/api/items', newItem);
      fetchItems();
      setItemName('');
      setItemQty('');
      setItemCategory('');
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Inventory Management</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={itemQty}
        onChange={(e) => setItemQty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <h3>Inventory List</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.itemName}</strong> ({item.category}) - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
