'use client'

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";


export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

  const searchParams = useSearchParams();
  const mainCategory = searchParams.get("main");
  const subCategory = searchParams.get("subcategory");


  const subCategories = {
    "Men's Clothing": [
      "T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets & Coats", "Suits & Blazers", "Activewear", "Ethnic Wear"
    ],
    "Women's Clothing": [
      "Tops & T-Shirts", "Dresses", "Jeans & Trousers", "Chec Skirts", "Sarees", "Kurtis & Salwar", "Suits", "Loungewear & Sleepwear"
    ],
    Kids: [
      "T-Shirts & Tops", "Dresses", "Shorts", "Ethnic Wear", "School Uniforms", "Jackets", "Sleepwear"
    ],
  };

  useEffect(() => {
  if (mainCategory) {
    setSelectedMainCategory(mainCategory);
    setFilters(prev => ({ ...prev, category: mainCategory }));
  }
  if (subCategory) {
    setSelectedSubCategory(subCategory);
    setFilters(prev => ({ ...prev, subcategory: subCategory }));
  }
}, [mainCategory, subCategory]);


  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setFiltered(data);
    };
    loadProducts();
  }, []);

  // Filtering logic
  useEffect(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.subcategory) {
      result = result.filter(p => p.subCategory === filters.subcategory);
    }


    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    setFiltered(result);
  }, [filters, selectedMainCategory, selectedSubCategory, products]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Thrift Store</h1>

      {/* 🔍 Filters */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
        <select
          value={selectedMainCategory}
          onChange={(e) => {
            setSelectedMainCategory(e.target.value);
            setSelectedSubCategory("");
            setFilters(prev => ({ ...prev, category: e.target.value, subcategory: "" }));
          }}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {Object.keys(subCategories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {selectedMainCategory && (
          <select
            value={selectedSubCategory}
            onChange={(e) => {
              setSelectedSubCategory(e.target.value);
              setFilters(prev => ({ ...prev, subcategory: e.target.value })); // ✅ sync with filters
            }}


            className="border p-2 rounded"
          >
            <option value="">Select Subcategory</option>
            {subCategories[selectedMainCategory].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        <input
          name="location"
          type="text"
          placeholder="Search by Location"
          value={filters.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="minPrice"
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products match your filters.</p>
        )}
      </div>
    </div>
  );
}
