'use client';
import { useState, useEffect } from 'react';

const RelatedProducts = ({ currentProductCategory }: { currentProductCategory: string }) => {
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch related products');
        }
        const data = await response.json();
        if (data && data.data) {
          // Filter related products based on category
          const related = data.data.filter(
            (product: any) => product.category === currentProductCategory
          );
          setRelatedProducts(related);
        }
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductCategory]);

  if (loading) return <div className="text-black">Loading related products...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="related-products container mx-auto p-6 bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.price} className="border border-gray-200 rounded-md p-4 bg-white shadow-lg hover:shadow-xl">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg text-gray-800 font-semibold">{product.productName}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-xl text-green-600 font-bold">{product.price} PKR</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
