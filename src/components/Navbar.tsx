'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaHeart, FaUser, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa'; 
import { useLanguage } from '@/context/LanguageContext'; 

// Fetch product data from your external API
const fetchProducts = async () => {
  const response = await fetch('https://template-03-api.vercel.app/api/products');
  if (!response.ok) {
    console.error('Failed to fetch products');
    return [];
  }
  const data = await response.json();
  return data;
};

export default function Navbar() {
  const { language, setLanguage, translate } = useLanguage(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'ar' | 'ur');
  };

  // Handle search input change
  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleSearch(); // Automatically filter products on search query change
  }, [searchQuery]);

  return (
    <div>
      {/* Navbar */}
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <div className="text-2xl font-bold">Shoezshop</div>

          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-200 p-2 rounded-lg text-black"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="ur">Urdu</option>
          </select>

          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex space-x-6">
            <a href="/" className="hover:text-gray-300 transition">{translate('home')}</a>
            <a href="/product" className="hover:text-gray-300 transition">{translate('products')}</a>
            <a href="#about" className="hover:text-gray-300 transition">{translate('about')}</a>
            <a href="#contact" className="hover:text-gray-300 transition">{translate('contact')}</a>
          </nav>

          {/* Right Side Icons (Cart, Wishlist, Profile, Register) */}
          <div className="flex space-x-6 items-center">
            {/* Search Icon */}
            <div className="relative">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white">
                <FaSearch size={20} />
              </button>
              {isSearchOpen && (
                <form onSubmit={(e) => e.preventDefault()} className="absolute top-8 right-0 bg-white p-2 rounded-lg shadow-lg flex items-center">
                  <input
                    type="text"
                    placeholder={translate('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 text-gray-800 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                  >
                    <FaSearch size={20} />
                  </button>
                </form>
              )}
            </div>

            {/* Cart Icon */}
            <a href="/cart" className="text-white">
              <FaShoppingCart size={20} />
            </a>

            {/* Wishlist Icon */}
            <a href="/wishlist" className="text-white">
              <FaHeart size={20} />
            </a>

            {/* User Profile / Admin */}
            <a href="/admin" className="text-white">
              <FaUser size={20} />
            </a>

            {/* Register Page */}
            <a href="/register" className="text-white">
              <FaUserPlus size={20} />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu (Responsive) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white"
            >
              <FaTimes size={25} />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-6 bg-gray-900 p-8">
            <a href="/" className="text-white">{translate('home')}</a>
            <a href="/product" className="text-white">{translate('products')}</a>
            <a href="#about" className="text-white">{translate('about')}</a>
            <a href="#contact" className="text-white">{translate('contact')}</a>
          </nav>
        </div>
      )}

      {/* Display filtered search results */}
      {filteredProducts.length > 0 && (
        <div className="bg-white p-4 mt-4">
          <h3 className="text-lg font-semibold">Search Results:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border p-4 rounded-md">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
