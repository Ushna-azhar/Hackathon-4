'use client';
import React, { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products and extract categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://template-03-api.vercel.app/api/products");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // Extract categories from the products
          const categorySet = new Set<string>();
          result.data.forEach((product: any) => {
            if (product.category) {
              categorySet.add(product.category);
            }
          });

          setCategories([...categorySet]); // Convert Set to Array
          setProducts(result.data); // Store all products
        } else {
          console.error("Expected an array of products, but got:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : [];

  return (
    <div className="py-10 bg-white">
      <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Shop By Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        {loading ? (
          <div className="text-center text-xl text-gray-500">Loading...</div>
        ) : categories.length > 0 ? (
          categories.map((category, index) => {
            // Filter products for this category to get the first image as category image
            const categoryProducts = products.filter((product) => product.category === category);
            const categoryImage = categoryProducts.length > 0 ? categoryProducts[0].image : ""; // Get the first product's image

            return (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden bg-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                {/* Display the image of the first product in this category */}
                <img
                  src={categoryImage}
                  alt={category}
                  className="w-full h-64 object-cover transition-transform duration-500 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white font-semibold text-xl bg-gradient-to-t from-black to-transparent p-2 rounded-md">
                  {category}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-xl text-gray-500">No categories available.</div>
        )}
      </div>

      {/* Display Products in the selected category */}
      {selectedCategory && (
        <div className="mt-10">
          <h3 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Products in "{selectedCategory}" Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h4 className="font-semibold text-lg text-gray-800">{product.productName}</h4>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-semibold text-xl text-gray-800">${product.price}</span>
                    <span className="text-sm text-gray-500">{product.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-xl text-gray-500">
                No products available in this category.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
