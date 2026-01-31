import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext.jsx';
import { motion } from 'framer-motion';

function CategoryManagement() {
  const { categories, addCategory, updateCategory, deleteCategory } = useExpense();
  const [newCategory, setNewCategory] = useState('');
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (newCategory) {
      addCategory(newCategory);
      setNewCategory('');
    }
  };

  const handleEdit = (category) => {
    setEditing(category);
    setEditValue(category);
  };

  const handleUpdate = () => {
    updateCategory(editing, editValue);
    setEditing(null);
    setEditValue('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Category Management</h2>
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Add New Category</label>
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <button onClick={handleAdd} className="btn" style={{ marginTop: '10px' }}>Add</button>
        </div>
      </div>
      <div className="card">
        <h3>Existing Categories</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map(c => (
            <li key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              {editing === c ? (
                <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
              ) : (
                <span>{c}</span>
              )}
              <div>
                {editing === c ? (
                  <button onClick={handleUpdate} className="btn">Save</button>
                ) : (
                  <button onClick={() => handleEdit(c)} className="btn">Edit</button>
                )}
                <button onClick={() => deleteCategory(c)} className="btn" style={{ background: '#ff5252', marginLeft: '10px' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default CategoryManagement;