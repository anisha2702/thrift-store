'use client'

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="border-b py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button
              onClick={clearCart}
              className="mt-2 text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
