'use client';

import { signIn, useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      const role = session.user.role;

      if (role === 'customer') {
        router.push('/account');
      } else {
        alert(`Access denied: ${role}s must log in through their own portal.`);
        signOut(); // Immediately log out seller or admin
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
      alert('Login failed: Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Customer Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border p-2 w-full"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border p-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-black text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
