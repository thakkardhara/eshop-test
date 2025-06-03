"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

const Cart = () => {
  const { cart, setCart, removeFromCart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] bg-gradient-to-b from-orange-50 to-white py-10 px-4">
        <h2 className="text-4xl font-bold text-center text-orange-600 mb-10">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
            <p className="mb-4 text-gray-600">No items in cart.</p>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
              onClick={() => router.push("/")}
            >
              Back to Home Page
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-md p-4 relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mb-4 sm:mb-0 sm:mr-4"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <div className="font-semibold text-orange-600">
                      {item.name}
                    </div>
                    {
                      item.size? <>
                      <div className="text-sm text-gray-600">
                      {item.color && <>Color: {item.color} • </>}
                      Size: {item.size}
                    </div>
                      </> :''
                    }
                    <div className="font-semibold text-orange-600 mt-1">
                      ${Number(item.price).toFixed(2)}
                    </div>

                    <div className="flex justify-center sm:justify-start items-center mt-2 space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, "dec")}
                        disabled={item.quantity <= 1}
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, "inc")}
                        className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <span
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 cursor-pointer hover:underline"
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[320px] bg-white rounded-lg shadow-md p-6 h-fit">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-orange-600 border-t pt-3 mt-3">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
