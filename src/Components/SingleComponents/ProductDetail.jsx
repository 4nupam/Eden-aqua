import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import useProductStore from "../../Zustand/ProductStore";
import toast from "react-hot-toast";
import getProductStore from "../../Zustand/GetProduct";

export default function ProductDetails() {
  const [productIndex, setProductIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [caseCount, setCaseCount] = useState(1);

  const { productlist = [], fetchProducts } = getProductStore();
  const { addProduct, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const product = productlist[productIndex];
  const isInCart = products.some((p) => p.id === product?._id);

  useEffect(() => {
    setImageIndex(0);
    setCaseCount(1);
  }, [productIndex]);

  const handleProductChange = (e) => {
    setProductIndex(Number(e.target.value));
  };

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % (product?.Sub_Images?.length || 1));
  };

  const prevImage = () => {
    setImageIndex((prev) =>
      (prev - 1 + (product?.Sub_Images?.length || 1)) % (product?.Sub_Images?.length || 1)
    );
  };

  const handleIncrease = () => setCaseCount((prev) => prev + 1);
  const handleDecrease = () => setCaseCount((prev) => (prev > 1 ? prev - 1 : 1));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleAddToCart = () => {
    if (!product) return;
    if (isInCart) {
      toast.error("Product already in cart!");
      return;
    }

    const productData = {
      id: product._id,
      name: product.Name,
      price: product.Price,
      quantity: caseCount,
      caseQuantity: product.BottbottlesPerCase || 1,
      totalBottles: caseCount * (product.BottbottlesPerCase || 1),
      totalPrice: (
        product.Price * caseCount * (product.BottbottlesPerCase || 1)
      ).toFixed(2),
      image: product.Sub_Images?.[0],
      size: product.Capacity,
    };

    addProduct(productData);
    toast.success(`${product.Name} (${caseCount} case${caseCount > 1 ? "s" : ""}) added to cart!`);
  };

  if (!productlist.length) {
    return <div className="text-center py-20 text-lg text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image Slider Section */}
      <div className="flex flex-col items-center gap-4">
        <div {...swipeHandlers} className="relative w-full flex items-center justify-center">
          <button
            onClick={prevImage}
            className="absolute cursor-pointer left-2 z-10 text-3xl text-[var(--primary-color)]"
          >
            <MdNavigateBefore />
          </button>
          <img
            src={product?.Sub_Images?.[imageIndex] || "https://via.placeholder.com/250"}
            alt={product?.Name}
            className="w-60 h-80 object-contain transition duration-300 ease-in-out"
          />
          <button
            onClick={nextImage}
            className="absolute cursor-pointer right-2 z-10 text-3xl text-[var(--primary-color)]"
          >
            <MdNavigateNext />
          </button>
        </div>
        <span className="text-sm text-gray-500 text-center">{product?.Name}</span>
        <div className="flex gap-2 mt-2">
          {product?.Sub_Images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-10 h-10 object-cover border rounded cursor-pointer ${
                imageIndex === idx ? "border-[var(--primary-color)]" : "border-gray-300"
              }`}
              onClick={() => setImageIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full flex flex-col gap-6 text-[var(--primary-color)]">
        {/* Bottle Size & Case Quantity Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            1. Select Bottle Size & Case Quantity
          </label>
          <select
            onChange={handleProductChange}
            value={productIndex}
            className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-800 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--fifth-color)]"
          >
            {productlist.map((item, index) => (
              <option key={item._id} value={index}>
                {item.Name} — {item.Capacity} — {item.BottbottlesPerCase} Bottles
              </option>
            ))}
          </select>
        </div>

        {/* Frequency Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            2. Select from Frequency
          </label>
          <select
            className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-800 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--fifth-color)]"
            defaultValue=""
          >
            <option disabled value="">Select frequency</option>
            <option value="one-time">One Time</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Pricing Info */}
        <div className="text-sm">
          <p className="text-gray-600 mb-1">
            Price per Bottle:{" "}
            <span className="font-semibold">${product?.Price?.toFixed(2)}</span>
          </p>
          <p className="text-lg font-bold text-[var(--fifth-color)]">
            TOTAL: ${(product?.Price * caseCount * (product?.BottbottlesPerCase || 1)).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500">
            ({caseCount * (product?.BottbottlesPerCase || 1)} Bottles in total)
          </p>
        </div>

        {/* Quantity Selector + Add to Cart */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
          <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-2 shadow-sm bg-white transition-all duration-200 hover:shadow-md">
            <button
              onClick={handleDecrease}
              className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 text-red-500 hover:text-red-600 transition"
              aria-label="Decrease"
            >
              <FaMinus size={14} />
            </button>
            <div className="text-center">
              <span className="block text-lg font-bold text-gray-800">{caseCount}</span>
            </div>
            <button
              onClick={handleIncrease}
              className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gray-100 hover:bg-green-100 text-green-600 hover:text-green-700 transition"
              aria-label="Increase"
            >
              <FaPlus size={14} />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full sm:w-auto font-semibold px-6 py-3 rounded-md transition ${
              isInCart
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[var(--primary-color)] text-white hover:bg-[var(--fifth-color)]"
            }`}
          >
            {isInCart ? "Already in Cart" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
}
