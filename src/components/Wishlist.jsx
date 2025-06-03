"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();

  if (wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <div className="text-center text-orange-500 font-bold py-20 text-xl">
          Your wishlist is empty.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-extrabold text-orange-600 mb-8 text-center">
          My Wishlist
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-orange-200 rounded-2xl shadow-lg w-full max-w-xs p-4 mb-8 flex flex-col justify-between"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-full object-contain mb-4 rounded-xl bg-orange-50 p-2 cursor-pointer"
                onClick={() => router.push(`/${product.id}/productdetail`)}
              />
              <h2
                className="text-lg font-bold text-gray-800 mb-2 truncate cursor-pointer"
                onClick={() => router.push(`/${product.id}/productdetail`)}
              >
                {product.name}
              </h2>
              <p className="text-sm text-orange-700 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-base font-semibold text-orange-600 mb-4">
                ${product.price}
              </p>
              <button
                className="w-full bg-orange-100 hover:bg-orange-200 text-orange-600 font-semibold py-2 rounded-md transition mb-2"
                onClick={() => router.push(`/${product.id}/productdetail`)}
              >
                View Details
              </button>
              <button
                className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-md transition"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
