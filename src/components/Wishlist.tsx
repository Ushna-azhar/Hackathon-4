'use client';

import React, { useState, useEffect } from 'react';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = (product: any) => {
    const updatedWishlist = wishlist.filter((item) => item.price !== product.price);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert(`${product.productName} removed from wishlist!`);
  };

  // Add item to cart from wishlist
  const addToCartFromWishlist = (product: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.productName} added to cart!`);
  };

  if (wishlist.length === 0) return <p className="text-center text-gray-500">Your wishlist is empty!</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-8 text-indigo-600">Wishlist</h1>

      <ul className="space-y-6">
        {wishlist.map((product, index) => (
          <li key={index} className="flex justify-between border-b py-4">
            <div className="flex items-center">
              <img
                src={product.image}
                alt={product.productName}
                className="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{product.productName}</h2>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => addToCartFromWishlist(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(product)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishlistPage;
