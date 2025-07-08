"use client";
import { useState } from "react";

export default function WhatsAppForm() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Thank you! We’ll contact you soon.");
      setPhone("");
    } else {
      alert(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Got preloved clothes to donate?
      </h2>
      <p className="text-gray-700 mb-6">
        Just drop your WhatsApp number below and we’ll get in touch with the next steps.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block font-medium text-sm text-gray-700 mb-1">WhatsApp Number</label>
          <input
            type="tel"
            placeholder="Enter your WhatsApp number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
