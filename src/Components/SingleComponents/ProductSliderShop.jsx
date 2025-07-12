import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MdNavigateNext,
  MdOutlineNavigateBefore,
} from "react-icons/md";
import useProductStore from "../../Zustand/ProductStore";
import getProductStore from "../../Zustand/GetProduct";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[var(--primary-color)] hover:text-[var(--fifth-color)] text-4xl"
    onClick={onClick}
  >
    <MdNavigateNext />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-[var(--primary-color)] hover:text-[var(--fifth-color)] text-4xl"
    onClick={onClick}
  >
    <MdOutlineNavigateBefore />
  </div>
);

export default function ProductSliderShop() {
  const { productlist = [], fetchProducts } = getProductStore();
  const { addProduct, products } = useProductStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

  const handleAddToCart = (product) => {
    const alreadyInCart = products.some((p) => p.id === product._id);
    if (alreadyInCart) {
      toast.error("Product already in cart!");
      return;
    }

    const productData = {
      id: product._id,
      name: product.Name,
      price: product.Price,
      quantity: 1,
      caseQuantity: product.BottbottlesPerCase || 1,
      totalBottles: product.BottbottlesPerCase || 1,
      totalPrice: (
        product.Price *
        1 *
        (product.BottbottlesPerCase || 1)
      ).toFixed(2),
      image: product.ProductImage,
      size: product.Capacity,
    };

    addProduct(productData);
    toast.success(`${product.Name} added to cart!`);
  };

  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    arrows: true,
    afterChange: (index) => setActiveIndex(index),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  if (!productlist.length) {
    return <div className="text-center py-12">Loading products...</div>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-4 py-12 gap-10"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #EFFBFD, #FFFFFF, #E0F7FA)",
      }}
    >
      <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-[var(--primary-color)] text-center">
        SHOP EDEN AQUA WATER
      </h1>

      <div className="relative w-full max-w-[90vw]">
        <Slider {...settings}>
          {productlist.map((product, idx) => {
            const isActive = idx === activeIndex;
            const hasDiscount =
              product.OriginalPrice && product.OriginalPrice > product.Price;
            const discountPercent = hasDiscount
              ? Math.round(
                  ((product.OriginalPrice - product.Price) / product.OriginalPrice) * 100
                )
              : 0;

            const inCart = products.some((p) => p.id === product._id);

            return (
              <div key={product._id} className="px-2">
                <div
                  className={`relative flex flex-col items-center text-center bg-white p-4 rounded-lg transition-all duration-300 ease-in-out ${
                    isActive ? "scale-105 shadow-lg" : "opacity-70"
                  }`}
                >
                  {/* Discount Badge */}
                  {hasDiscount && (
                    <div className="absolute top-4 right-2 font-bold bg-red-500 text-white text-xs px-2 py-1 rounded-xl">
                       {discountPercent}% OFF
                    </div>
                  )}

                  {/* Image */}
                  <img
                    src={product.ProductImage}
                    alt={product.Name}
                    className="w-32 h-32 object-contain mb-2"
                  />

                  {/* Product Details */}
                  <h2 className="text-[var(--primary-color)] font-semibold text-sm">
                    {product.Name}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Capacity: {product.Capacity}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Case: {product.BottbottlesPerCase} bottles
                  </p>

                  {/* Price */}
                  <div className="mt-1">
                    <span className="text-lg font-bold text-gray-800">
                      {formatPrice(product.Price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {formatPrice(product.OriginalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={inCart}
                      className={`px-3 cursor-pointer py-1 text-sm rounded-md transition ${
                        inCart
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[var(--primary-color)] text-white hover:opacity-90"
                      }`}
                    >
                      {inCart ? "Already in Cart" : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="px-3 py-1 cursor-pointer text-sm rounded-md border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* Static Button */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-2 cursor-pointer rounded-md bg-[var(--primary-color)] text-white font-bold hover:opacity-90 transition-all duration-300"
        >
          VIEW ALL PRODUCTS
        </button>
      </div>
    </div>
  );
}
