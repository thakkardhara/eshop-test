"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "@/context/WishlistContext";
import { AiFillHeart } from "react-icons/ai";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      setProducts(mod.default);
    });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase()) ||
      product.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <div className="bg-white min-h-screen py-6 px-4 sm:px-8">
        {/* Carousel */}
        <div className="mb-10 rounded-xl overflow-hidden shadow-md">
          <Carousel autoplay dots>
            {["banner/img1.webp", "b2.webp", "b3.webp"].map((src, idx) => (
              <div key={idx}>
                <img
                  src={`/${src}`}
                  alt={`Banner ${idx + 1}`}
                  className="h-64 sm:h-80 w-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-8 drop-shadow-md">
          Discover Our Products
        </h1>
        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const wished = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  onClick={(e) => {
                 
                    if (e.target.closest(".wishlist-heart")) return;
                    router.push(`/${product.id}/productdetail`);
                  }}
                  className="bg-white border border-orange-200 hover:border-orange-400 rounded-2xl shadow-lg hover:shadow-2xl w-full max-w-xs cursor-pointer transform hover:scale-105 transition-all duration-300 p-4 mb-8"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover mb-4 rounded-xl bg-orange-50 p-2"
                  />
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
                      {product.name}
                    </h2>
                    <button
                      className="wishlist-heart focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        wished
                          ? removeFromWishlist(product.id)
                          : addToWishlist(product);
                      }}
                      aria-label={
                        wished ? "Remove from wishlist" : "Add to wishlist"
                      }
                    >
                      {wished ? (
                        <AiFillHeart className="text-2xl text-orange-600" />
                      ) : (
                        <FiHeart className="text-2xl text-orange-600" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-orange-700 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-base font-semibold text-orange-600 mb-1">
                    ${product.price}
                  </p>
                  {/* <p className="text-sm text-gray-600 mb-1">
                  Sizes:{" "}
                  <span className="font-medium text-orange-500">
                    {product.sizes?.length ? product.sizes.join(", ") : "N/A"}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Colors:{" "}
                  <span className="font-medium text-orange-500">
                    {product.colorsAvailable?.join(", ")}
                  </span>
                </p> */}
                </div>
              );
            })
          ) : (
            <div className="text-center text-red-500 font-semibold w-full py-10 col-span-full">
              No products found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
