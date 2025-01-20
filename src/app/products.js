// src/app/products/price/[price]/page.tsx
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import axios from "axios";

// Dynamically import the component to ensure it's only used on the client-side
const ProductByPrice = dynamic(() => import('@/components/ProductByPrice'), {
  ssr: false, // Disable SSR to render only on the client-side
});

const ProductPage = () => {
  return (
    <div>
      <ProductByPrice />
    </div>
  );
};

export default ProductPage;
