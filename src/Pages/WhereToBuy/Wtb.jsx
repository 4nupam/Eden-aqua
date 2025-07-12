import React from "react";
import WaterShopLocator from "../../Components/Map/WaterShopLocator";

export default function Wtb() {
  const brandData = [
    {
      brand: "Zepto",
      image:
        "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751276849/image_44_qmthwh.svg",
      link: "https://www.zepto.app",
    },
    {
      brand: "Flipkart",
      image:
        "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751276848/image_47_amwnkk.svg",
      link: "https://www.flipkart.com",
    },
    {
      brand: "Amazon",
      image:
        "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751276848/image_43_xof2mg.png",
      link: "https://www.amazon.in",
    },
    {
      brand: "bigbasket",
      image:
        "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751276849/image_48_ocgvwt.svg",
      link: "https://www.bigbasket.com",
    },
    {
      brand: "blinkit",
      image:
        "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751276848/image_45_rcjcck.svg",
      link: "https://www.blinkit.com",
    },
    {
      brand: "swiggy",
      image:
        "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751276848/image_46_mphmry.svg",
      link: "https://www.swiggy.com/instamart",
    },
  ];

  return (
    <div className="w-full bg-[#F0FAFA] min-h-screen relative pt-20 px-4 pb-12">
      {/* Breadcrumb */}
      <div className="absolute top-4 left-4 sm:left-8 text-sm font-semibold text-black bg-opacity-30 px-3 py-1">
        HOME : <span className="text-[#0077B6]">WHERE TO BUY</span>
      </div>

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#021624] mb-10">
        YOU CAN FIND US ON
      </h2>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-0 border border-gray-200 rounded-xl overflow-hidden">
        {brandData.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-6 bg-white transition-transform duration-300 hover:scale-105 border-b border-r border-gray-200 last:border-r-0 sm:last:border-r sm:border-b-0 sm:border-r"
          >
            <img
              src={item.image}
              alt={item.brand}
              className="w-20 h-20 object-contain"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      {/* Divider Text */}
      <div className="my-10 text-center">
        <span className="text-gray-500 text-sm uppercase tracking-wider">
          — OR —
        </span>
      </div>

      {/* Locate a Store */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-[#021624] mb-6">
        Locate a Store
      </h2>
      <WaterShopLocator />

      {/* Section Title - Newsletter */}
      <div className="flex items-center w-full justify-center gap-4 mt-16 mb-8">
        <div className="h-px bg-[var(--fifth-color)] flex-1" />
        <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold text-[var(--primary-color)] tracking-wide">
          NEWSLETTER
        </h2>
        <div className="h-px bg-[var(--fifth-color)] flex-1" />
      </div>

      {/* Newsletter Input */}
      <div className="flex flex-col items-center gap-6 py-8 w-full max-w-xl mx-auto">
        <span className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary-color)] font-bold tracking-wide text-center">
          STAY IN THE KNOW
        </span>

        <div className="flex flex-col md:flex-row gap-1 md:gap-0 px-4 w-full">
          <input
            type="email"
            placeholder="EMAIL ADDRESS*"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
          <button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-opacity-90 transition cursor-pointer">
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
