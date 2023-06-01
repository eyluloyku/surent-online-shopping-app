import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./prodManForms.css";

function UpdateCategoryForm() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/getAll');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:8080/api/products/update/${selectedProductId}`, {
        category: newCategory
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }

    // Clear form fields
    setSelectedProductId('');
    setNewCategory('');
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <label>
        Product:
        <select
          value={selectedProductId}
          onChange={(event) => setSelectedProductId(event.target.value)}
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.Pname}
            </option>
          ))}
        </select>
      </label>
      <label>
        New Category:
        <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          required
        />
      </label>
      <button type="submit">Update Category</button>
    </form>
  );
}

export default UpdateCategoryForm;
