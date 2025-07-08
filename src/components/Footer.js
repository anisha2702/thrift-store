
'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import Reveal from './Reveal';

export default function Footer() {
  return (
    <>
    <footer className="bg-[#FEFAE0] text-black px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Important Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Important Links</h2>
          <ul className="space-y-2 font-medium">
            <li className='hover:underline'><Link href="/return-policy">Returns policy</Link></li>
            <li className='hover:underline'><Link href="/shop?category=Women">Women</Link></li>
            <li className='hover:underline'><Link href="/shop?category=Men">Men</Link></li>
            <li className='hover:underline'><Link href="/shop?category=Kids">Kid</Link></li>
            <li className='hover:underline'><Link href="/blog">Blog</Link></li>
            <li className='hover:underline'><Link href="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact</h2>
          <ul className="space-y-2 font-medium">
            <li className='hover:underline'><Link href="/about">About Us</Link></li>
            <li className='hover:underline'><Link href="/email">Email Us</Link></li>
            <li className='hover:underline'><Link href="/seller-login">Sell</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div className='mx-auto'>
          <Reveal>
        <div>
          <h2 className="text-lg font-semibold mb-4">Subscribe to our emails</h2>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-black rounded w-full"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
            >
              Subscribe →
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
        </Reveal>
        </div>
      </div>
    </footer>
    
    </>
  );
}
