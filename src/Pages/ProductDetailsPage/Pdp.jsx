import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import getProductStore from "../../Zustand/GetProduct";
import useProductStore from "../../Zustand/ProductStore";
import toast from "react-hot-toast";
import { MdNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 z-10 transform -translate-y-1/2 text-4xl text-[var(--primary-color)] cursor-pointer"
    onClick={onClick}
  >
    <MdNavigateNext />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 z-10 transform -translate-y-1/2 text-4xl text-[var(--primary-color)] cursor-pointer"
    onClick={onClick}
  >
    <MdOutlineNavigateBefore />
  </div>
);

export default function Pdp() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productlist, fetchProducts } = getProductStore();
 const { addProduct, products } = useProductStore();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!id) {
    return (
      <div className="text-center py-12 text-red-500">
        Product ID not found.
      </div>
    );
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const selected = productlist.find((item) => item._id === id);
    setProduct(selected);
  }, [productlist, id]);

  const isInCart = products.some((item) => item.id === id);

 const handleAddToCart = () => {
  if (!product) return;

  const caseQuantity = product.BottbottlesPerCase || 1;
  const totalBottles = quantity * caseQuantity;
  const totalPrice = (product.Price * totalBottles).toFixed(2);

  const productData = {
    id: product._id,
    name: product.Name,
    price: product.Price,
    quantity,
    caseQuantity,
    totalBottles,
    totalPrice,
    image: product.ProductImage,
    size: product.Capacity,
  };

  addProduct(productData);
  toast.success(`${product.Name} added to cart!`);
};


  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (!product) {
    return <div className="text-center py-12">Loading product...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 rounded-lg h-full mt-10">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image Slider */}
        <div className="w-full md:w-1/2 relative">
          {product.Sub_Images && product.Sub_Images.length > 0 ? (
            <Slider {...sliderSettings}>
              {product.Sub_Images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`${product.Name}-${index}`}
                    className="w-full h-64 object-contain"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src={product.ProductImage}
              alt={product.Name}
              className="w-full h-64 object-contain border rounded"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between gap-4 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800">{product.Name}</h1>
          <p className="text-gray-600">Capacity: {product.Capacity}</p>
          <p className="text-gray-600">
            Case of {product.BottbottlesPerCase} bottles
          </p>

          <div className="text-xl font-bold text-green-600">
            <span className="text-black font-bold">Discount Price: </span> $
            {Number(product.Price).toFixed(2)}
          </div>

          {product.OriginalPrice && product.OriginalPrice > product.Price && (
            <div>
              <span className="text-black font-bold">Original Price: </span>
              <span className="text-sm text-gray-500 line-through">
                ${Number(product.OriginalPrice).toFixed(2)}
              </span>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-2 py-1 text-sm border rounded"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-2 py-1 text-sm border rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`mt-4 px-4 py-2 rounded text-white font-semibold transition-all ${
              isInCart
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--primary-color)] hover:opacity-90"
            }`}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
