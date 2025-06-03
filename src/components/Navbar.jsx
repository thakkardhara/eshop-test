import React, { useState } from "react";
import { FiShoppingCart, FiHeart, FiMoreHorizontal, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = ({ search, setSearch }) => {
  const router = useRouter();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg px-6 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
    
      <div
        className="text-md lg:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 cursor-pointer"
        onClick={() => router.push("/")}
      >
        eShope
      </div>

    
      <div className="flex-1 max-w-xl w-full">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-orange-600 transition-all duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

  
      <div className="hidden sm:flex items-center space-x-4">
  
        <button
          className="relative p-3 rounded-full bg-gradient-to-br from-orange-100 to-white hover:from-orange-200 hover:to-orange-50 transition-all duration-300 shadow"
          onClick={() => router.push("/wishlist")}
        >
          <FiHeart className="text-2xl text-orange-600" />
        </button>

  
        <button
          className="relative p-3 rounded-full bg-gradient-to-br from-orange-100 to-white hover:from-orange-200 hover:to-orange-50 transition-all duration-300 shadow"
          onClick={() => router.push("/cart")}
        >
          <FiShoppingCart className="text-2xl text-orange-600" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden p-2 rounded-full bg-gradient-to-br from-orange-100 to-white hover:from-orange-200 hover:to-orange-50 transition-all duration-300 shadow"
        onClick={() => setMobileMenuOpen(true)}
      >
        <FiMoreHorizontal className="text-xl text-orange-600" />
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#17171763] "
            onClick={() => setMobileMenuOpen(false)}
          />
 
          <div className="ml-auto h-full w-72 max-w-full bg-white shadow-xl flex flex-col items-start relative animate-slideInRight">
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX className="text-2xl text-gray-600" />
            </button>
            <div className="w-full mt-16 flex flex-col gap-2 px-4">
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition mb-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/wishlist");
                }}
              >
                <FiHeart className="text-2xl text-orange-600" />
                <span className="text-orange-700 font-semibold">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/cart");
                }}
              >
                <FiShoppingCart className="text-2xl text-orange-600" />
                <span className="text-orange-700 font-semibold">Cart</span>
                {cart.length > 0 && (
                  <span className="ml-auto bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
