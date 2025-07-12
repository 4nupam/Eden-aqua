import React from "react";

export default function SustainCard({ text }) {
    return (
        <div className="relative bg-white shadow-lg rounded-xl p-5 h-72 w-64 flex items-start justify-start hover:shadow-2xl transition-shadow duration-300 ">
            {/* Decorative Image */}
            <img
                src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829555/image_34_ybhfnu.png"
                alt=""
                className="absolute -top-10 left-4 w-12 h-12 z-10"
            />

            {/* Text Content */}
            <p className="relative z-10 text-sm md:text-base text-[#021624] font-medium leading-relaxed">
                {text}
            </p>
        </div>
    );
}
