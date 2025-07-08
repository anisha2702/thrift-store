
'use client';

import Link from 'next/link';
export default function Header(){
  return(
    <header className="bg-gray-300 flex justify-between items-center px-6 py-2 w-full">
        <h1 className="text-2xl font-serif font-semibold">ThrifNix</h1>
        <nav className="space-x-6 text-lg">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/email">Contact Us</Link>
        </nav>
      </header>

  )
}

