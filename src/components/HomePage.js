'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FaqSection from './faqSection';
import NewArrivals from './NewArrivals';
import Footer from './Footer';
import Reveal from './Reveal';


export default function HomePage() {
  const router = useRouter();
  const [openCategory, setOpenCategory] = useState(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category) => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

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

    <div className="flex flex-col min-h-screen overflow-x-hidden font-montserrat">
      {/* Top Register Bar */}
      <div className="bg-[#FB6F92] text-center py-1 text-sm w-full font-montserrat font-bold">
        <Link href="/register">Register Now</Link>
      </div>

      {/* Navigation Bar */}
      <header className="bg-white flex justify-between items-center px-6 py-2 w-full">
        <h1 className="text-2xl font-serif font-bold ml-4">ThrifNix</h1>
        <nav className="space-x-6 text-lg font-bold">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/email">Contact Us</Link>
        </nav>
      </header>

      {/* Vertical Seller Login Button */}
      

      {/* Cart Floating Button - Top Right Corner */}
      <div className="relative top-[6px] left-[1431px] z-40">
        <button
          onClick={() => router.push('/cart')}
          className="bg-[#5CB338] px-4 py-2 rounded text-sm hover:bg-gray-400 shadow flex items-center gap-2 font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386a1.5 1.5 0 011.414 1.09l.383 1.276M6.75 14.25h10.5m-10.5 0L5.383 6.934m1.367 7.316L8.25 18h7.5l1.5-3.75M6.75 14.25h10.5m0 0l1.5-7.5H6.221"
            />
          </svg>
          Cart
        </button>
      </div>

      {/* Hero Section */}
      <main className="bg-[#FFE5EC] flex-grow flex flex-col items-center py-7 m-[-36px] ">

       
      <Reveal>
        <h2 className="text-4xl  md:text-[67px] font-serif font-bold mb-2">DISCOVER THRIFTED</h2>

        <h3 className="text-4xl md:text-[50px] font-serif font-bold mt-4 mb-4 text-center">FASHION</h3>
        <p className="text-lg mb-4 text-center">Find unique and pre-owned clothing</p>
        </Reveal>
       
        


        {/* Shop Now Button (No Dropdown) */}
        <div className='mx-auto w-[40%]'>
          <Reveal delay={0.2}>
            <div className=" bg-gradient-to-r from-[#1b2021] to-[#1b2021] text-[#FFFFFF] p-4 text-center shadow-md">
              <p className="text-xl font-bold">
                🎉 Welcome Offer: Get <span className="text-white">40% OFF</span> Your First Order!
              </p>
              <p className="mt-2 text-lg">
                Use Code: <span className="bg-white text-pink-600 font-semibold px-2 py-1 rounded">FIRST40</span>
              </p>
              <button onClick={() => router.push('/shop')} className="mt-4 bg-white text-pink-600 font-bold py-2 px-4 rounded shadow hover:bg-pink-100">
                Shop Now
              </button>
            </div>

          </Reveal>
        </div>
        {/* Category Toggle Section */}
        <div className='mx-auto w-[80%]'
        >
          <Reveal>
            <div className="bg-white px-8 py-4 rounded  max-w-5xl mt-6 relative mx-auto">
              <div className="flex justify-around font-serif font-medium text-lg relative z-10">

                {/* Men */}
                <div className="relative z-[1000]">
                  <button onClick={() => toggleCategory('men')} className="focus:outline-none">
                    Men ▾
                  </button>
                  {openCategory === 'men' && (
                    <div className="absolute top-full left-[8%] bg-white shadow-md p-4 space-y-2 z-[9999] rounded w-48">
                      <Link href="/shop?main=Men's Clothing" className="block font-semibold hover:underline">View All</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=T-Shirts" className="block hover:underline">T-Shirts</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Shirts" className="block hover:underline">Shirts</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Jeans" className="block hover:underline">Jeans</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Trousers" className="block hover:underline">Trousers</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Jackets & Coats" className="block hover:underline">Jackets & Coats</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Suits & Blazers" className="block hover:underline">Suits & Blazers</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Activewear" className="block hover:underline">Activewear</Link>
                      <Link href="/shop?main=Men's Clothing&subcategory=Ethnic Wear" className="block hover:underline">Ethnic Wear</Link>
                    </div>
                  )}
                </div>

                {/* Women */}
                <div className="relative">
                  <button onClick={() => toggleCategory('women')} className="focus:outline-none">
                    Women ▾
                  </button>
                  {openCategory === 'women' && (
                    <div className="absolute top-full left-[40%] bg-white shadow-md p-4 space-y-2 z-50 rounded w-48">
                      <Link href="/shop?main=Women's Clothing" className="block font-semibold hover:underline">View All</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Tops & T-Shirts" className="block hover:underline">Tops & T-Shirts</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Dresses" className="block hover:underline">Dresses</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Jeans & Trousers" className="block hover:underline">Jeans & Trousers</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Skirts" className="block hover:underline">Skirts</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Sarees" className="block hover:underline">Sarees</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Kurtis & Salwar" className="block hover:underline">Kurtis & Salwar</Link>
                      <Link href="/shop?main=Women's Clothing&subcategory=Loungewear & Sleepwear" className="block hover:underline">Loungewear & Sleepwear</Link>
                    </div>
                  )}
                </div>

                {/* Kids */}
                <div className="relative">
                  <button onClick={() => toggleCategory('kids')} className="focus:outline-none">
                    Kids ▾
                  </button>
                  {openCategory === 'kids' && (
                    <div className="absolute top-full left-[80%] bg-white shadow-md p-4 space-y-2 z-50 rounded w-48">
                      <Link href="/shop?main=Kids" className="block font-semibold hover:underline">View All</Link>
                      <Link href="/shop?main=Kids&subcategory=T-Shirts & Tops" className="block hover:underline">T-Shirts & Tops</Link>
                      <Link href="/shop?main=Kids&subcategory=Dresses" className="block hover:underline">Dresses</Link>
                      <Link href="/shop?main=Kids&subcategory=Shorts" className="block hover:underline">Shorts</Link>
                      <Link href="/shop?main=Kids&subcategory=Ethnic Wear" className="block hover:underline">Ethnic Wear</Link>
                      <Link href="/shop?main=Kids&subcategory=School Uniforms" className="block hover:underline">School Uniforms</Link>
                      <Link href="/shop?main=Kids&subcategory=Jackets" className="block hover:underline">Jackets</Link>
                      <Link href="/shop?main=Kids&subcategory=Sleepwear" className="block hover:underline">Sleepwear</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className='mx-auto w-[80%]'>
          <Reveal className='relative z-0'>
            <NewArrivals />
          </Reveal>
        </div>

        <div className='mx-auto w-[80%]'>
          <Reveal>
            <section className="mt-5 py-12 px-6 text-gray-800">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Why Thrift?</h2>
                <p className="text-lg mb-8 text-black">
                  Choosing thrifted fashion means making a smarter, more sustainable choice — for you and the planet.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-green-50 p-4 rounded-xl shadow mx-auto">
                    <Reveal delay={0}>
                      <h3 className="font-semibold text-lg mb-2">♻️ Eco-Friendly</h3>
                      <p>Reduce waste and support sustainable fashion.</p>
                    </Reveal>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl shadow">
                    <Reveal delay={0.2}>
                      <h3 className="font-semibold text-lg mb-2">💸 Budget Friendly</h3>
                      <p>Look stylish without overspending.</p>
                    </Reveal>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-xl shadow">
                    <Reveal delay={0.4}>
                      <h3 className="font-semibold text-lg mb-2">🌟 One-of-a-Kind</h3>
                      <p>Stand out with rare and vintage pieces.</p>
                    </Reveal>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl shadow">
                    <Reveal delay={0.6}>
                      <h3 className="font-semibold text-lg mb-2">🧵 High Quality</h3>
                      <p>Find well-made clothing that lasts longer.</p>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        </div>

        <div className='mx-auto w-[80%]'>
          <Reveal>
            <section className="bg-black py-12 px-6 m overflow-hidden">
              <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 group transition duration-700 ease-in-out">

                <div className="flex-1 text-center md:text-left animate-fade-in-up">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 transition duration-300 group-hover:text-blue-600">
                    Too Many Clothes Sitting Idle?
                  </h2>
                  <p className="text-lg text-white mb-6 transition duration-300 group-hover:text-gray-200">
                    Give your pre-loved pieces a new home. Declutter your closet and earn while doing good for the planet.
                  </p>
                  <button
                    onClick={() => router.push('/seller-login')}
                    className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Start Selling Now →
                  </button>
                </div>

                <div className="flex-1 flex justify-center animate-fade-in-left">
                  <img src="/images/thrift-image.png" alt="Woman holding clothes bag" className="w-50 h-auto object-cover rounded-xl shadow-md transform transition duration-500 group-hover:scale-105 " />
                </div>

              </div>
            </section>
          </Reveal>
        </div>

        {/* WhatsApp Form Section */}
        <div className="mx-auto w-[60%]">
          <Reveal>
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 shadow-sm mt-10">
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
          </Reveal>
        </div>

        {/* Continue with the rest of your homepage content */}
        <div className='mx-auto w-[60%]'>
          <Reveal>
            <FaqSection />
          </Reveal>
        </div>




      </main>

      <Footer />

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4 text-sm font-serif w-full">
        © 2025 Thrifnix. All rights reserved.
      </footer>
    </div>

  );

}
