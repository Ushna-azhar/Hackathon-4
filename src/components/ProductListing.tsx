'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProductListing = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<any>({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart with quantity
  const addToCart = (product: any, quantity: number) => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedProduct = { ...product, quantity };
      cart.push(updatedProduct);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.title} (x${quantity}) added to cart!`);
    }
  };

  // Add product to wishlist
  const addToWishlist = (product: any) => {
    if (typeof window !== 'undefined') {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.some((item: any) => item.id === product.id)) { // Use `id` for uniqueness
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.title} added to wishlist!`);
      } else {
        alert(`${product.title} is already in your wishlist.`);
      }
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, product: any) => {
    setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) });
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li
            key={product.id} // Use `id` as the unique key
            className="border p-4 rounded-lg shadow-sm flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
            />
            <div className="text-center">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-500">${product.price}</p>
              <div className="mt-4 flex items-center justify-center">
                <input
                  type="number"
                  value={quantities[product.id] || 1} // Use `id` for tracking quantities
                  onChange={(e) => handleQuantityChange(e, product)}
                  className="w-12 text-center border px-2 py-1 rounded"
                  min="1"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
                  onClick={() => addToCart(product, quantities[product.id] || 1)} // Use `id` for quantity
                >
                  Add to Cart
                </button>
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded ml-4"
                  onClick={() => addToWishlist(product)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => router.push('/cart')}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default ProductListing;
