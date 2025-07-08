'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerDashboard() {
  const categoryOptions = {
    "Men's Clothing": [
      'T-Shirts', 'Shirts', 'Jeans', 'Trousers', 'Jackets & Coats', 'Suits & Blazers', 'Activewear', 'Ethnic Wear',
    ],
    "Women's Clothing": [
      'Tops & T-Shirts', 'Dresses', 'Jeans & Trousers', 'Skirts', 'Sarees', 'Kurtis & Salwar', 'Suits', 'Loungewear & Sleepwear'
    ],
    "Kids": [
      'T-Shirts & Tops', 'Dresses', 'Shorts', 'Ethnic Wear', 'School Uniforms', 'Jackets', 'Sleepwear'
    ],
  };

  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "",
    subCategory: "",
    image: null,
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "seller") {
      router.push("/seller-login");
    }
  }, [session, status]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const sellerProducts = data.filter(p => p.sellerId === session?.user?.id);
        setProducts(sellerProducts);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (session?.user?.id) fetchProducts();
  }, [session]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      location: product.location,
      category: product.category,
      subCategory: product.subCategory || "",
      image: null,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("category", formData.category);
    form.append("subCategory", formData.subCategory);
    if (formData.image) {
      form.append("image", formData.image);
    }

    const res = await fetch(`/api/products/${editingProduct.id}`, {
      method: "PUT",
      body: form,
    });

    if (res.ok) {
      const updated = await res.json();
      setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        category: "",
        subCategory: "",
        image: null,
      });
    } else {
      const msg = await res.text();
      console.error("Update failed:", msg);
      alert("Failed to update product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("category", formData.category);
    form.append("subCategory", formData.subCategory);
    form.append("image", formData.image);

    const res = await fetch("/api/products", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      const newProduct = await res.json();
      setProducts(prev => [...prev, newProduct]);
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        category: "",
        subCategory: "",
        image: null,
      });
    } else {
      const msg = await res.text();
      console.error("Failed:", msg);
      alert("Failed to add product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome {session?.user?.email}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" />
        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full p-2 border rounded" />

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Main Category</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {formData.category && (
          <select
            value={formData.subCategory}
            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Sub Category</option>
            {categoryOptions[formData.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}

        <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>

      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h2 className="font-bold">{product.title}</h2>
              <p>{product.location}</p>
              <p>₹{product.price}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <form onSubmit={handleEditSubmit} className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border rounded" />
          <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border rounded" />
          <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 border rounded" />
          <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full p-2 border rounded" />

          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value, subCategory: "" })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Main Category</option>
            {Object.keys(categoryOptions).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {formData.category && (
            <select
              value={formData.subCategory}
              onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Sub Category</option>
              {categoryOptions[formData.category].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
        </form>
      )}
    </div>
  );
}
