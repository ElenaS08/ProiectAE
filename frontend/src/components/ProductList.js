import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    axios
      .get('http://localhost:8080/products')
      .then((response) => {
        setProducts(Array.isArray(response.data) ? response.data : []);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault(); // Previne reload-ul paginii
    if (!newProduct.name || !newProduct.price) {
      alert('Please fill in all fields.');
      return;
    }

    axios
      .post('http://localhost:8080/products', {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      })
      .then(() => {
        alert('Product added successfully!');
        setNewProduct({ name: '', price: '' });
        fetchProducts(); // Reîncarcă lista de produse
      })
      .catch((err) => {
        console.error('Error adding product:', err);
        alert('Failed to add product.');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}

      <h2>Add a new product</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductList;
