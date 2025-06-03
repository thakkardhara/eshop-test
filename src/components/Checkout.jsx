"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "./Navbar";

const Checkout = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const itemId = searchParams.get("item");

  const checkoutItem = useMemo(
    () => (itemId ? cart.find((i) => String(i.id) === String(itemId)) : null),
    [cart, itemId]
  );
  const checkoutItems = itemId && checkoutItem ? [checkoutItem] : cart;

  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (itemId && checkoutItem) {
      removeFromCart(checkoutItem.id);
    } else {
      clearCart();
    }
  };

  const grandTotal = checkoutItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-xl p-6 text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold text-orange-600 mb-3">
          🎉 Order Placed!
        </h2>
        <p className="text-gray-700 mb-1">Thanks, {form.name}!</p>
        <p className="text-sm text-gray-500">
          Your order was successful. Redirecting to home...
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] bg-gradient-to-b from-orange-50 to-white py-10 px-4">
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 border-t-4 border-orange-500">
          <h2 className="text-3xl font-bold mb-6 text-orange-600 text-center">
            🛒 Checkout
          </h2>

          {/* Cart Summary */}
          {checkoutItems.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-orange-50 border border-orange-200">
              {checkoutItems.length === 1 ? (
                <>
                  <h3 className="font-semibold text-lg text-center">
                    {checkoutItems[0].name}
                  </h3>
                  <div className="text-sm text-center text-gray-600">
                    Quantity: {checkoutItems[0].quantity}
                  </div>
                  <div className="text-sm text-center text-gray-600">
                    Price: ${Number(checkoutItems[0].price).toFixed(2)}
                  </div>
                  <div className="text-orange-700 text-lg font-bold text-center mt-1">
                    Total: $
                    {(
                      Number(checkoutItems[0].price) * checkoutItems[0].quantity
                    ).toFixed(2)}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-center text-orange-700 mb-2">
                    Grand Total
                  </h3>
                  <div className="text-center text-2xl font-bold text-orange-600">
                    ${grandTotal.toFixed(2)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Checkout Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4 animate-slide-up"
            autoComplete="off"
          >
            <input
              className="w-full border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:outline-none rounded-lg px-4 py-2 text-sm"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:outline-none rounded-lg px-4 py-2 text-sm"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              className="w-full border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:outline-none rounded-lg px-4 py-2 text-sm resize-none"
              name="address"
              rows={3}
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 transition-colors text-white font-bold py-2 px-4 rounded-lg shadow-sm"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
