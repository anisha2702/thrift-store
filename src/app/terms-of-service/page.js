'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function TermsOfServicePage() {
  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-10 font-serif text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          Welcome to ThrifNix! By accessing or using our website, you agree to comply with and be bound by the following Terms of Service.
          Please read them carefully before using our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
        <p className="mb-4">
          You may browse, view, and make purchases on ThrifNix in accordance with these terms. You agree not to use the site for any unlawful or prohibited purpose.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Account Responsibility</h2>
        <p className="mb-4">
          If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password.
          You agree to accept responsibility for all activities that occur under your account.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Product Information</h2>
        <p className="mb-4">
          All products are listed with as much accuracy as possible. ThrifNix is not responsible for slight variations in color, size, or quality.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Pricing and Payment</h2>
        <p className="mb-4">
          Prices are displayed in INR and are subject to change. All payments are processed securely through our payment gateway.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Returns and Refunds</h2>
        <p className="mb-4">
          Our Return Policy outlines the terms for returning items. Please refer to our{' '}
          <a href="/return-policy" className="text-blue-600 underline">Return Policy</a> page for more details.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
        <p className="mb-4">
          All content on this site, including images, text, and design, is the property of ThrifNix. You may not copy or use it without permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms of Service from time to time. Continued use of the website constitutes acceptance of the new terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
        <p className="mb-4">
          For any questions about these terms, please contact us at{' '}
          <a href="mailto:support@thrifnix.com" className="text-blue-600 underline">support@thrifnix.com</a>.
        </p>

        <p className="mt-8">Thank you for using ThrifNix!</p>
      </main>
      <Footer/>
    </>
  );
}
