"use client";
import React, { useState } from "react";
import products from "@/data/products.json";
import Navbar from "./Navbar";
import ReactImageMagnify from "react-image-magnify";
import { useCart } from "@/context/CartContext";

const ProductDetail = ({ id }) => {
  const product = products.find((p) => p.id === Number(id));

  // Build an array of image URLs (img1..img4) that actually exist
  function getImgPath(img) {
    if (!img) return null;
    return img.startsWith("/") ? img : `/${img}`;
  }
  const images = [
    getImgPath(product?.image),
    getImgPath(product?.img1),
    getImgPath(product?.img2),
    getImgPath(product?.img3),
    getImgPath(product?.img4),
  ].filter(Boolean);
  console.log("Product Detail:", images);

  const [mainImg, setMainImg] = useState(images[0]);
  // Modal state for mobile image preview
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colorsAvailable?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      image: mainImg,
      color: selectedColor,
      size: selectedSize,
      quantity,
      price: product.price,
    };
    addToCart(cartItem);
    window.location.href = "/cart";
  };

  // Helper to detect small/tablet screens
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  // Swipe handlers for modal
  function handleSwipe(direction) {
    if (direction === "left") {
      setPreviewIdx((prev) => (prev + 1) % images.length);
    } else if (direction === "right") {
      setPreviewIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  }

  // Touch event state
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      if (touchStartX - touchEndX > 50) handleSwipe("left");
      else if (touchEndX - touchStartX > 50) handleSwipe("right");
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!product) {
    return (
      <div className="text-center text-red-600 mt-10">Product not found.</div>
    );
  }

  return (
    <>
      <Navbar />
      {/* Mobile/Tablet Image Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-400 via-[#ECD3C4] to-orange-600 animate-fadeIn">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-2xl font-bold text-orange-600 bg-white bg-opacity-80 rounded-full shadow-lg px-2 hover:bg-orange-100 transition"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close preview"
          >
            &times;
          </button>
          {/* Previous Button */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl text-white bg-orange-500 bg-opacity-80 rounded-full shadow-lg px-2 pb-0.5 hover:bg-orange-600 transition"
            onClick={() => handleSwipe("right")}
            aria-label="Previous image"
          >
            &#8592;
          </button>
          {/* Main Preview Image */}
          <img
            src={images[previewIdx]}
            alt={`Preview ${previewIdx + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl border-4 border-orange-400 shadow-2xl animate-zoomIn"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          {/* Next Button */}
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-white bg-orange-500 bg-opacity-80 rounded-full shadow-lg px-2 pb-0.5 hover:bg-orange-600 transition"
            onClick={() => handleSwipe("left")}
            aria-label="Next image"
          >
            &#8594;
          </button>
          {/* Thumbnails Row */}
          {/* <div className="absolute bottom-6 left-0 w-full flex justify-center">
            <div
              className="flex gap-3 overflow-x-auto px-4 py-2 rounded-lg bg-white bg-opacity-80 shadow-inner scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-[#ECD3C4]"
              style={{ maxWidth: "90vw" }}
            >
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer transition-all duration-200 ${
                    previewIdx === idx
                      ? "border-orange-500 scale-105"
                      : "border-gray-300 opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setPreviewIdx(idx)}
                />
              ))}
            </div>
          </div> */}
        </div>
      )}
      <div className="max-w-fit mt-50 sm:mt-0 lg:mt-0 mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[90vh] flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* ---------- IMAGE SECTION ---------- */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full">
            {/* Thumbnails (Mobile: horizontal below main image, Desktop: vertical) */}
            <div className="order-2 md:order-1 w-full md:w-auto">
              <div
                className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible px-1 py-2 md:py-0 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-[#ECD3C4]"
                style={{ maxWidth: "100%" }}
              >
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${
                      mainImg === img
                        ? "border-orange-500 scale-105"
                        : "border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => {
                      setMainImg(img);
                      if (isMobile) {
                        setPreviewIdx(idx);
                        // setIsPreviewOpen(true);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Main Image with Magnify or Click-to-Preview */}
            <div className="order-1 md:order-2 w-full max-w-md mx-auto md:mx-0">
              {isMobile ? (
                <img
                  src={mainImg}
                  alt={product.name}
                  className="object-contain w-full h-80 rounded-md cursor-pointer  border-orange-400 shadow-lg"
                  onClick={() => {
                    setPreviewIdx(images.indexOf(mainImg));
                    setIsPreviewOpen(true);
                  }}
                />
              ) : (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: mainImg,
                    },
                    largeImage: {
                      src: mainImg,
                      width: 1000,
                      height: 1000,
                    },
                    enlargedImageContainerStyle: { zIndex: 999 },
                    enlargedImageContainerDimensions: {
                      width: "120%",
                      height: "100%",
                    },
                  }}
                />
              )}
            </div>
          </div>

          {/* ---------- DETAILS SECTION ---------- */}
          <div className="flex flex-col justify-start mb-5">
            {/* 1️⃣ TITLE */}
            <h1 className="text-4xl font-bold text-orange-400 mb-2">
              {product.name}
            </h1>

            {/* 2️⃣ PRICE, OLD PRICE & DISCOUNT */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-semibold text-orange-400">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="ml-4 text-gray-400 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                  <span className="ml-3 text-gray-300 font-medium">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* 3️⃣ DESCRIPTION */}
            {product.description && (
              <p className="text-gray-600 mb-6">{product.description}</p>
            )}

            {/* 4️⃣ COLOR OPTIONS */}
            {product.colorsAvailable?.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-800 font-medium mb-2">Color</p>
                <div className="flex space-x-3">
                  {product.colorsAvailable.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "text-orange-500 ring-2 ring-[#ECD3C4]"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 5️⃣ SIZE OPTIONS */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-800 font-medium mb-2">Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-md text-gray-700 transition ${
                        selectedSize === size
                          ? "text-orange-500 bg-[#ECD3C4] font-semibold"
                          : "border-gray-300 hover:text-orange-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6️⃣ QUANTITY */}
            <div className="mb-6">
              <p className="text-gray-800 font-medium mb-2">Quantity</p>
              <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50 hover:text-orange-500"
                >
                  –
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) =>
                      product.stock ? Math.min(product.stock, q + 1) : q + 1
                    )
                  }
                  className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50 hover:text-orange-500"
                >
                  +
                </button>
              </div>
            </div>

            {/* 7️⃣ ADD TO CART BUTTON */}
            {product.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-600 hover:bg-orange-700 transition text-white font-semibold py-3 rounded-md"
              >
                Add to Cart – ${(product.price * quantity).toFixed(2)}
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-400 text-white font-semibold py-3 rounded-md cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
