'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // For dynamic route params
import RelatedProducts from '@/components/RelatedProducts';

const ProductByPrice = () => {
  const [products, setProducts] = useState<any[]>([]); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [cart, setCart] = useState<any[]>([]); // Local cart state
  const [wishlist, setWishlist] = useState<any[]>([]); // Local wishlist state
  const [message, setMessage] = useState<string | null>(null); // Success message state
  const [currentProductCategory, setCurrentProductCategory] = useState<string | null>(null); // State for product category

  const params = useParams(); // Get dynamic route params
  const price = params.price; // Extract price from URL params

  // Fetch products based on price
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products. Status: ' + response.status);
        }
        const data = await response.json();
        if (data && data.data) {
          // Filter products by price from the URL parameter
          const filteredProducts = data.data.filter((product: any) => product.price === parseInt(price || '0'));
          setProducts(filteredProducts);
          if (filteredProducts.length > 0) {
            // Set the category for related products from the first product
            setCurrentProductCategory(filteredProducts[0].category);
          }
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (price) {
      fetchProducts();
    } else {
      setLoading(false); // If no price, stop loading
    }
  }, [price]); // Dependency array ensures it only runs when the price changes

  // Load cart and wishlist from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save cart and wishlist to local storage whenever they change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    if (wishlist.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [cart, wishlist]);

  // Add product to cart
  const handleAddToCart = (product: any) => {
    // Check if the product is already in the cart
    setCart((prevCart) => {
      const productExists = prevCart.some((item) => item.price === product.price);
      if (productExists) {
        return prevCart; // Don't add the product again if already in cart
      }
      // Add the product to the cart
      return [...prevCart, product];
    });
    setMessage('Product added to cart!'); // Show success message
    setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
  };

  // Add or remove product from wishlist
  const handleWishlistToggle = (product: any) => {
    const isProductInWishlist = wishlist.some((item) => item.price === product.price); // Check if the product is in the wishlist
    
    setWishlist((prevWishlist) => {
      if (isProductInWishlist) {
        return prevWishlist.filter((item) => item.price !== product.price); // Remove from wishlist
      }
      return [...prevWishlist, product]; // Add to wishlist
    });

    setMessage(isProductInWishlist ? 'Product removed from wishlist!' : 'Product added to wishlist!');
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products with Price: {price} PKR</h1>
      {message && <div className="alert bg-green-500 text-white p-4 mb-4">{message}</div>} {/* Success message */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={`${product.price}-${index}`} className="border rounded-md p-4">
            <img src={product.image} alt={product.productName} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-lg font-semibold">{product.productName}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-xl font-bold">{product.price} PKR</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Inventory: {product.inventory}</p>

            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleAddToCart(product)} // Add to cart
            >
              Add to Cart
            </button>

            {/* Add to Wishlist Button */}
            <button
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={() => handleWishlistToggle(product)} // Toggle wishlist
            >
              {wishlist.some((item) => item.price === product.price) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        ))}
      </div>
      {currentProductCategory && <RelatedProducts currentProductCategory={currentProductCategory} />}
    </div>
  );
};

export default ProductByPrice;
