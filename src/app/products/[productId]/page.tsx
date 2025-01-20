import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLanguage } from "@/context/LanguageContext"; // For multi-language support
import RelatedProducts from "@/components/RelatedProducts"; // Import related products component

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const { language } = useLanguage(); // Get the selected language
  const [product, setProduct] = useState<any>(null); // Product state
  const [loading, setLoading] = useState(true); // Loading state
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]); // Related products state

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://template-03-api.vercel.app/api/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Failed to fetch product details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  // Fetch related products based on product category
  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const response = await fetch("https://template-03-api.vercel.app/api/products");
          const data = await response.json();
          // Filter related products based on category (or other criteria)
          const related = data.filter((p: any) => p.category === product.category && p.id !== product.id);
          setRelatedProducts(related);
        } catch (error) {
          console.error("Failed to fetch related products:", error);
        }
      };

      fetchRelatedProducts();
    }
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/2">
          <img src={product.image} alt={product.productName} className="w-full h-96 object-cover mb-6" />
        </div>
        <div className="sm:w-1/2 sm:pl-6">
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-bold">{product.price} PKR</p>
          <p className="mt-2 text-sm text-gray-500">Category: {product.category}</p>
          <p className="mt-2 text-sm text-gray-500">Inventory: {product.inventory}</p>
          <button className="mt-6 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-10">Related Products</h2>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetail;
