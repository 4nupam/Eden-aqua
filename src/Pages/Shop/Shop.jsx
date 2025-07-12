import React, { useEffect } from "react";
import ProductCard from "../../Components/Cards/ProductCard";
import NewsLetter from "../../Components/SingleComponents/NewsLetter";
import getProductStore from "../../Zustand/GetProduct";

export default function Shop() {
  const { productlist = [], fetchProducts } = getProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
console.log("Product List:", productlist);
  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[90vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751283158/pexels-paggiarofrancesco-593099_c4xroh.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-start px-6">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
              Browse & Shop Your Essentials with Ease
            </h1>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full px-4 md:px-12 py-10 bg-[#F8FAFB]">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#021624] mb-8">
          Our Bottled Water Range
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productlist.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">Loading products...</p>
          ) : (
            productlist.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                image={item.ProductImage}
                name={`${item.Name} (${item.Capacity})`}
                price={item.Price}
               capacity={item.Capacity}
                caseQuantity={item.BottbottlesPerCase} 
              />
            ))
          )}
        </div>
      </div>

      <NewsLetter />
    </>
  );
}
