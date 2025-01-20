'use client'; // Ensures this is a client-side component
import { useRouter } from 'next/router'; // For routing
import { useEffect, useState } from 'react'; // For hooks

interface Product {
  productName: string;
  image: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
}

const ProductDetail = () => {
  const router = useRouter();
  const { price, productId } = router.query; // Capture price and productId from the URL
  
  const [product, setProduct] = useState<Product | null>(null); // State for product
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch the product based on `productId` and `price` from the URL
  useEffect(() => {
    if (!productId || !price) return; // If `productId` or `price` is not available, don't fetch data

    const fetchProduct = async () => {
      try {
        const response = await fetch('https://template-03-api.vercel.app/api/products'); // Correct the URL here
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        if (!data?.data) {
          throw new Error('Invalid data structure from the API');
        }

        // Find product by `productId`
        const product = data.data.find((prod: any) => prod.id === productId);
        if (product && product.price === parseInt(price as string)) {
          setProduct(product); // Set the product data directly if found
        } else {
          throw new Error('No matching product found');
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProduct();
  }, [productId, price]); // Re-run effect if either `productId` or `price` changes

  // Display loading message
  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message if any error occurs
  if (!product) return <div>No product found.</div>; // Show message if no product matches

  return (
    <div className="product-detail">
      <h1>{product.productName}</h1>
      <img src={product.image} alt={product.productName} className="product-image" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Inventory: {product.inventory}</p>
    </div>
  );
};

export default ProductDetail;
