'use client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReturnPolicyPage() {
  return (
    <>
    <Header/>
    <div className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800 font-serif">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">🛍️ Return Policy</h1>

        <p className="mb-6">
          At <strong>ThrifNix</strong>, we care about your satisfaction! Since our items are pre-loved and often one-of-a-kind, we’ve set up a return policy that is fair and simple.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">🔁 Return Eligibility</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>Returns are accepted <strong>only for damaged, defective, or incorrect items</strong>.</li>
          <li>You must <strong>initiate the return within 5 days</strong> of delivery.</li>
          <li>Items must be <strong>unworn, unwashed, and in original condition</strong> with tags (if applicable).</li>
          <li>Certain items like <strong>innerwear, accessories, and final sale items</strong> are not eligible for return.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">📦 How to Request a Return</h2>
        <ol className="list-decimal ml-6 mb-4 space-y-1">
          <li>Email us at <strong>support@thrifnix.com</strong> with your <strong>Order ID</strong>, product name, and issue.</li>
          <li>Attach clear photos of the item showing the defect or issue.</li>
          <li>Once approved, we’ll provide you with return instructions.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-6 mb-2">💸 Refunds</h2>
        <ul className="list-disc ml-6 mb-4 space-y-1">
          <li>Approved returns will be refunded via the <strong>original payment method</strong> within <strong>7 business days</strong> of receiving the item.</li>
          <li><strong>Shipping costs are non-refundable</strong>, unless the error was on our end.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">📬 Exchanges</h2>
        <p className="mb-4">
          As most of our products are <strong>one-of-a-kind</strong>, we <strong>cannot offer exchanges</strong>. Instead, we recommend returning the item and placing a new order.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">🤝 Need Help?</h2>
        <p>
          We’re here for you! Contact us at <strong>support@thrifnix.com</strong> or visit the{' '}
          <a href="/contact" className="text-pink-600 underline hover:text-pink-700">Contact Us</a> page.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}
