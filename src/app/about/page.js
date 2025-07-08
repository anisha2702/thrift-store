'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-10 font-serif text-gray-800">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>

        <p className="mb-4">
          Welcome to <span className="font-semibold">ThrifNix</span> – your go-to destination for unique, stylish, and affordable thrifted fashion!
          We’re on a mission to make sustainable fashion accessible, fun, and rewarding for everyone.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Our Story</h2>
        <p className="mb-4">
          ThrifNix was born out of a passion for style and sustainability. With fast fashion taking a toll on the environment, we wanted to create a platform
          where fashion lovers could find second-hand gems while helping reduce waste.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside mb-4">
          <li>High-quality pre-owned clothing for Men, Women, and Kids</li>
          <li>Unique vintage pieces and one-of-a-kind finds</li>
          <li>A platform for sellers to list and earn from unused fashion</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Our Values</h2>
        <ul className="list-disc list-inside mb-4">
          <li><span className="font-semibold">Sustainability:</span> Promoting reuse and reducing textile waste</li>
          <li><span className="font-semibold">Affordability:</span> Fashion that fits your budget</li>
          <li><span className="font-semibold">Community:</span> Connecting conscious buyers and sellers</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Get In Touch</h2>
        <p className="mb-4">
          We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello,
          feel free to reach out to us at <a href="mailto:support@thrifnix.com" className="text-blue-600 underline">support@thrifnix.com</a>.
        </p>

        <p className="mt-6 font-semibold">Thank you for supporting sustainable fashion with ThrifNix. 🌿</p>
      </main>
      <Footer/>
    </>
  );
}

