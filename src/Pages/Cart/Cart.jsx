import React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import NewsLetter from "../../Components/SingleComponents/NewsLetter";
import useProductStore from "../../Zustand/ProductStore";
import { useNavigate } from "react-router-dom";
import RazorpayButton from "../../RazorPay/Razorpay";
export default function Cart() {

  const navigate = useNavigate();
  const {
    products,
    updateProductQuantity,
    removeProduct,
    clearCart,
  } = useProductStore();

  const totalPayable = products.reduce(
    (total, product) =>
      total + product.price * product.quantity * product.caseQuantity,
    0
  );

  if (products.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center border border-dashed rounded-md mt-12">
        <p className="text-xl mb-2 text-gray-600">Your cart is currently empty.</p>
        <button
        onClick={() => navigate('/shop')}
        className="mt-4 px-6 py-3 bg-[var(--primary-color)] text-white rounded-md hover:bg-[var(--fifth-color)] transition">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 mt-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-[var(--primary-color)] text-center">
          Your Shopping Cart
        </h2>

        {/* Product List */}
        <div className="flex flex-col gap-6">
          {products.map((product) => {
            const itemTotal =
              product.price * product.quantity * product.caseQuantity;

            return (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-center gap-6 pb-4 border-b"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-contain"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">
                    {product.caseQuantity} bottles per case
                  </p>

                  {/* Line item: 2 cases × 24 bottles × $4.99 */}
                  <p className="text-sm text-gray-600 mt-1">
                    {product.quantity} case{product.quantity > 1 ? "s" : ""} ×{" "}
                    {product.caseQuantity} bottles ×{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </p>

                  <p className="text-lg font-bold text-[var(--primary-color)] mt-1">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(itemTotal)}
                  </p>
                </div>

                {/* Quantity + Remove */}
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <button
                    onClick={() =>
                      updateProductQuantity(product.id, product.quantity - 1)
                    }
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-[var(--primary-color)] transition"
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateProductQuantity(product.id, product.quantity + 1)
                    }
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-[var(--primary-color)] transition"
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="ml-4 text-red-600 hover:text-red-800 transition text-sm flex items-center gap-1"
                  >
                    <FaTrash />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total & Payment */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t pt-6">
          <div className="text-xl font-bold text-gray-700">
            Total Payable:{" "}
            <span className="text-[var(--primary-color)]">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalPayable)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold transition"
            >
              Clear Cart
            </button>
           <RazorpayButton
  amountUSD={totalPayable}
  product={{
    id: "cart_checkout",
    name: "EDEN AQUA Order",
    items: products,
  }}
/>

          </div>
        </div>
      </div>

      <NewsLetter />
    </>
  );
}
