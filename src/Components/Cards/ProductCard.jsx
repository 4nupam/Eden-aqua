import React, { useState } from "react";
import useProductStore from "../../Zustand/ProductStore";
import toast from "react-hot-toast";

export default function ProductCard({
  id,
  image,
  name,
  price,
  capacity,
  caseQuantity,
  defaultQuantity = 1,
  onAddToCart = () => {},
}) {
  const [quantity, setQuantity] = useState(defaultQuantity);
  const { products, addProduct, removeProduct } = useProductStore();

  const isInCart = products.some((product) => product.id === id);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (isInCart) {
      toast.error("Product already in cart");
      return;
    }

    const totalBottles = quantity * caseQuantity;
    const totalPrice = (price * totalBottles).toFixed(2);

    const productData = {
      id,
      name,
      price,
      capacity,
      caseQuantity,
      totalBottles,
      totalPrice,
      quantity,
      image,
    };

    addProduct(productData);
    onAddToCart(productData);
    toast.success(`${name} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    removeProduct(id);
    toast.success(`${name} removed from cart`);
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <div className="max-w-sm w-full mx-auto border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition bg-white">
      <div className="bg-[#F9FBFC] p-4 flex justify-center items-center h-56 rounded-2xl">
        <img src={image} alt={name} className="h-full object-contain" loading="lazy" />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-[var(--primary-color)]">{name}</h3>

        <div className="text-left">
          <p className="text-xl font-bold text-[var(--fifth-color)]">Price: {formattedPrice}</p>
          <p className="text-xs text-gray-600 font-light">
            Bottles per Case: {caseQuantity}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-[var(--sixth-color)]">Case Quantity:</label>
          <div className="flex items-center rounded-md overflow-hidden">
            <button
              type="button"
              onClick={decrementQuantity}
              className="px-3 py-1 bg-gray-200 text-red-600 hover:bg-gray-300 text-lg font-bold"
            >
              –
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-14 text-center py-1 focus:outline-none"
            />
            <button
              type="button"
              onClick={incrementQuantity}
              className="px-3 py-1 bg-gray-200 text-green-800 hover:bg-gray-300 text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-[var(--fifth-color)] font-semibold text-base">
          Total: <span className="text-xl">${(price * quantity * caseQuantity).toFixed(2)}</span>
          <p className="text-xs text-gray-500">({quantity * caseQuantity} bottles)</p>
        </div>

        {isInCart ? (
          <button
            onClick={handleRemoveFromCart}
            className="mt-4 cursor-pointer bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md transition"
          >
            Remove from Cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="mt-4 cursor-pointer bg-[var(--fifth-color)] hover:bg-[var(--primary-color)] text-white text-sm font-semibold py-2 px-4 rounded-md transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
