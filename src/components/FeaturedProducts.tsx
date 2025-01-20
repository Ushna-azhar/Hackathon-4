'use client';
import React, { useState, useEffect } from 'react';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch featured products data from the API
    fetch('https://template-03-api.vercel.app/api/products')
      .then((response) => response.json())
      .then((data) => {
        // Set the products state with the fetched data
        setProducts(data.data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length === 0 ? (
            <p>Loading featured products...</p>
          ) : (
            products.slice(0, 4).map((product) => (
              <div key={product.id || product.productName} className="bg-gray-200 p-6 rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600 mb-4">{product.price} PKR</p>
                <div className="mt-4">
                  <a href={`/product/${product.id}`} className="text-blue-600 hover:text-blue-800">
                    View Details
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
