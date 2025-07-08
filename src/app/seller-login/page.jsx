'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SellerLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      const role = session?.user?.role;
      if (role === 'seller') {
        router.push('/seller/dashboard');
      } else {
        alert('Access denied. Only sellers can log in here.');
        router.push('/login'); // redirect to customer login
      }
    }
  }, [session, status]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      alert('Seller login failed: ' + res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">👔 Seller Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border p-2 w-full rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border p-2 w-full rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white p-2 w-full rounded hover:bg-gray-800"
        >
          Login as Seller
        </button>
      </form>
    </div>
  );
}
