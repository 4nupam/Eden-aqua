import React from "react";
import ProductDetails from "../../Components/SingleComponents/ProductDetail";
import FourGroup from "../../Components/SingleComponents/FourGroup";
import Quote from "../../Components/SingleComponents/QuotesCarousel";
import NewsLetter from "../../Components/SingleComponents/NewsLetter";
export default function Sas() {
  const data = [
    {
      logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750836690/image_38_gj2lme.png",
      txt: "Save 20% on Every Subscription Order",
    },
    {
      logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751347670/Group_2085663393_cgzkep.svg",
      txt: "RECEIVE FAST, FREE SHIPPING",
    },
    {
      logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751347670/image_39_q1otop.svg",
      txt: "SKIP OR CANCEL ANYTIME",
    },
    {
      logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751347670/image_40_ziltfa.svg",
      txt: "ENJOY THE SMOOTH, SOFT TASTE OF FIJI WATER",
    },
  ];
  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF, #EFFBFD, #FFFFFF, #E0F7FA)",
      }}
    >
      {/* Breadcrumb */}
      <div className="px-4 sm:px-8 py-4 text-sm">
        <div className="flex items-center gap-2 font-semibold text-gray-600 ">
          <span>HOME :</span>
          <span className="text-[#0077B6] "> SUBSCRIBE AND SAVE</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-8 text-center py-8 flex flex-col items-center gap-4">
        <h1 className="text-[#021624] font-bold text-3xl sm:text-5xl leading-tight">
          EARTH’S FINEST WATER
        </h1>
        <p className="text-black text-lg sm:text-2xl max-w-3xl">
          Enjoy <span className="font-semibold text-[#0077B6]">20% off</span> EDEN AQUA Water with our hassle-free delivery.
        </p>
      </section>

      {/* Product Section */}
      <div className="px-4 sm:px-8">
        <ProductDetails />
      </div>

      {/* Four Group */}
      <div className="flex items-center justify-center w-full">
        <FourGroup data={data} background={true} />
      </div>
      {/* Quote */}
      <div className="">
        <Quote />
      </div>

      {/* Ready To Subscribe Section */}
      <div
        className="w-full flex flex-col items-center justify-center gap-6 py-16 px-4 sm:px-8"

      >
        <h2 className="text-4xl sm:text-5xl font-bold text-[#021624] drop-shadow-md tracking-wide text-center max-w-3xl">
          READY TO <span className="text-[var(--primary-color)]">SUBSCRIBE?</span>
        </h2>
        <button
          className="mt-2 px-8 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-lg shadow-lg 
               hover:bg-[var(--fifth-color)] transition duration-300 ease-in-out
               focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)] focus:ring-opacity-50"
        >
          GET STARTED
        </button>
      </div>

      <div className="w-full">
        <NewsLetter />
      </div>

    </div>
  );
}
