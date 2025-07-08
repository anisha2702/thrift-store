'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registered! Now login.");
      router.push("/login");
    } else {
      alert(data.error || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit" className="bg-black text-white p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}
