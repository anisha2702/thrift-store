'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dhnrqufgy/upload";
const UPLOAD_PRESET = "thrift-store";

export default function SellerProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    location: "",
    category: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = res.data.secure_url;
      setForm({ ...form, image: imageUrl });
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };


  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "seller") {
      router.push("/login");
    } else {
      fetchProducts();
    }
  }, [router,session]);

  const fetchProducts = async () => {
    const res = await fetch("/api/seller-products");
    const data = await res.json();
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Product added");
      setForm({ title: "", description: "", price: "", image: "", location: "", category: "" });
      fetchProducts();
    } else {
      alert("Error adding product");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  if (!session || session.user.role !== "seller") return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-8">
      <h1 className="text-2xl font-bold">Your Products</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          className="border p-2 w-full"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 w-full"
        />
        {uploading && <p className="text-sm text-gray-500">Uploading image...</p>}
        {form.image && (
          <Image 
          src={form.image} 
          alt="Preview" 
          width={500}
          height={300}
          className="h-40 mt-2 rounded" />
        )}

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={handleChange}
        />
        <select
          name="category"
          value={form.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select Category</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Accessories">Accessories</option>
          <option value="Winter Wear">Winter Wear</option>
        </select>

        <button type="submit" className="bg-black text-white p-2 w-full">
          Add Product
        </button>
      </form>

      <div className="mt-6 space-y-2">
        {products.map((product) => (
          <div key={product.id} className="border p-3 rounded">
            <h2 className="font-semibold">{product.title}</h2>
            <p>{product.price} ₹ – {product.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
