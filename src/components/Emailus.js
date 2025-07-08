'use client';

import { useState } from 'react';

export default function EmailUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Message sent! (This is just a placeholder alert)");
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">📩 Email Us</h1>
      <p className="mb-6 text-lg text-gray-700">
        Got a question or feedback? We’d love to hear from you. Fill out the form below!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 border rounded shadow-sm"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full p-3 border rounded shadow-sm"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows="5"
          className="w-full p-3 border rounded shadow-sm"
        ></textarea>

        {/* ✅ Submit Button Here */}
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded shadow"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
