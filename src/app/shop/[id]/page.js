'use client' // 👈 Needed for hooks

import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext"; // 👈 Import Cart
import {use, useEffect, useState } from "react";

export default function ProductPage({ params: asyncParams }) {
  const params = use(asyncParams);
  const { addToCart } = useCart(); // 👈 Access addToCart
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`, {
        cache: "no-store",
      });

      const all = await res.json();
      const found = all.find((p) => p.id === params.id);
      if (!found) return notFound();
      setProduct(found);
    };

    fetchProduct();
  }, [params.id]);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        className="w-full max-h-[400px] object-cover rounded mb-6"
      />

      <p className="text-lg text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold">₹{product.price}</p>
      <p className="text-sm text-gray-500 mb-2">📍 Location: {product.location}</p>
      <p className="text-sm text-gray-500 mb-6">👤 Seller: {product.seller.name}</p>

      {/* ✅ Functional Add to Cart */}
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
