import React from "react";
import { useNavigate } from "react-router-dom";
export default function ShopHero() {
  const navigate = useNavigate()
  return (
    <div
      className="h-[90vh] w-full bg-cover bg-center flex items-center justify-start px-6"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750828021/image_28_2_lldrqf.png')",
      }}
    >
      <div className="w-full md:w-1/2  flex flex-col items-center gap-4 text-center md:text-left">
        <div className="flex flex-col justify-center  gap-4">
          <span className="text-[var(--primary-color)] text-left font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Naturally Sourced, Expertly Packaged, Unmatched in Purity
          </span>

          <div className="flex gap-4">
            <button
             onClick={()=>navigate('/shop')}
            className="px-5 cursor-pointer py-2 border border-[var(--primary-color)] text-[var(--primary-color)] font-semibold rounded hover:bg-[var(--primary-color)] hover:text-white transition">
              SHOP NOW
            </button>
            <button
            onClick={()=>navigate('/shop')}
            className="px-5 cursor-pointer py-2 bg-[var(--primary-color)] text-white font-semibold rounded hover:opacity-90 transition">
              VIEW PRODUCTS
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
