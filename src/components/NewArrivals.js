'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // ✅ Import cart context

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ Get addToCart function

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        const res = await fetch('/api/products/newest');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching new arrivals:', err);
        setProducts([]);
      }
    };

    fetchNewestProducts();
  }, []);

  return (
    <div className="bg-[#FEFAE0] px-6 py-10 mt-5 w-[80%] mx-auto rounded-md shadow z-0 relative">
      <h2 className="text-3xl font-bold text-center mb-4 text-[#D4A373]">✨ New Arrivals</h2>
      <p className="text-center mb-6 text-gray-600">Check out the latest thrifted additions!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative w-full h-64">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.seller?.name || 'Unknown Seller'}</p>
                <p className="text-green-600 text-sm">{product.stock > 0 ? 'In stock' : 'Out of stock'}</p>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-pink-600 font-bold">₹{product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[#D4A373] hover:bg-[#b67f4f] text-white text-sm px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
