import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./prodManForms.css";

function NewProductForm() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [products, setProducts] = useState([]);

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
      const response = await axios.post('http://localhost:8080/api/products/add', {
        Pname: productName,
        price: price,
        stock: stock,
        category: category,
        description: description
      });

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }

    // Clear form fields
    setProductName('');
    setPrice('');
    setStock('');
    setCategory('');
    setDescription('');
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:8080/api/products/rem/${deleteId}`);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
    }

    // Clear delete ID field
    setDeleteId('');
  };

  return (
    <div>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
      <div className="delete-section">
        <h2>Delete Product</h2>
        <form onSubmit={handleDelete}>
          <label>
            Product ID:
            <select
              value={deleteId}
              onChange={(event) => setDeleteId(event.target.value)}
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
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}

export default NewProductForm;