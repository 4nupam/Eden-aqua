import React from "react";

export default function AboutHero() {
  return (
    <div
      className="h-[90vh] flex items-center justify-center flex-col bg-cover bg-center relative px-1 text-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829586/image_35_tcu3gx.png')",
      }}
    >
      {/* Breadcrumb */}
      <div className="absolute top-3 left-4 sm:left-8 text-white text-sm font-semibold flex items-center gap-2">
        HOME : <span className="text-[#0077B6]">ABOUT</span>
      </div>

      {/* Hero Content */}
      <div className="text-white flex flex-col gap-4 max-w-4xl">
        <span className="font-semibold text-lg sm:text-xl md:text-2xl">
          Earth’s Finest Water
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          MORE THAN WATER
        </h1>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
          By sharing water from Eden Aqua’s sustainable ancient artesian aquifer with the world and
          working to improve the lives and environment of its people, Eden Aqua Water has embodied
          what it means to be Earth's Finest Water® since 1996.
        </p>
      </div>
    </div>
  );
}
