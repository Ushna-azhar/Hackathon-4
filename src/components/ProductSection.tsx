'use client';
import React, { useState, useEffect } from 'react';

const ProductSection = ({ products = [] }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data and handle errors
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setLoading(false);
        products = data.data; // Set products to state if fetch is successful
      } catch (error) {
        setLoading(false);
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p> // Show error message if any
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length === 0 ? (
              <p>No products available</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="bg-gray-200 p-6 rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                  <p className="text-gray-600 mb-4">{product.price} PKR</p>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <div className="mt-4">
                    <a href={`/product/${product.id}`} className="text-blue-600 hover:text-blue-800">
                      View Details
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
