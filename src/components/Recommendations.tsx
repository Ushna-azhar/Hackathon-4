'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <div className="text-center text-xl font-semibold py-6">Loading recommendations...</div>;

  return (
    <div className="container mx-auto bg-white px-4 py-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product: any) => (
          <div key={product.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover mb-4 transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
              <p className="text-sm text-gray-600 mt-2 truncate">{product.description}</p>
              <p className="text-lg font-bold text-gray-800 mt-4">{product.price} USD</p>
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                  Add to Cart
                </button>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200">
                  Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
