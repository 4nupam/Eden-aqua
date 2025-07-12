import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function NewsLetter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    console.log("Email before POST:", email);

    try {
      const res = await fetch(
        "https://edenaqua-production.up.railway.app/user/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: email }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to subscribe. Please try again.");
      }

      console.log("Email after POST:", email);
      toast.success("Thank you for subscribing!");
      setEmail(""); // Clear the field
    } catch (err) {
      console.error("Email post error:", err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 px-1 py-12 sm:px-6 md:px-8 lg:px-10 w-full">
      {/* Logo */}
      <img
        src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750841688/Group_2085663304_awpckc.png"
        alt="Eden Aqua Logo"
        className="w-28 sm:w-36 md:w-48"
      />

      {/* Section Title - Ways to Buy */}
      <div className="flex items-center w-full justify-center gap-4">
        <div className="h-px bg-[var(--fifth-color)] flex-1" />
        <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold text-[var(--primary-color)] tracking-wide">
          Ways to Buy Eden Aqua Water
        </h2>
        <div className="h-px bg-[var(--fifth-color)] flex-1" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col px-4 sm:flex-row items-center justify-center gap-4 w-full">
        <button
          onClick={() => navigate("/subscribe")}
          className="w-full cursor-pointer sm:w-auto bg-[var(--primary-color)] text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition"
        >
          <img
            src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750920582/Bottle_of_Water_s0p3u1.png"
            alt="Bottle"
            className="w-5 h-5"
          />
          SUBSCRIBE & SAVE
        </button>
        <button
          onClick={() => navigate("/wheretobuy")}
          className="w-full cursor-pointer sm:w-auto px-5 py-2 border border-[var(--primary-color)] rounded-lg flex items-center justify-center gap-2 text-white bg-[var(--primary-color)] hover:bg-opacity-90 transition"
        >
          <img
            src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750920583/Shop_dyvt4a.png"
            alt="Store"
            className="w-5 h-5"
          />
          LOCATE A STORE
        </button>
      </div>

      {/* Section Title - Newsletter */}
      <div className="flex items-center w-full justify-center gap-4">
        <div className="h-px bg-[var(--fifth-color)] flex-1" />
        <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold text-[var(--primary-color)] tracking-wide">
          NEWSLETTER
        </h2>
        <div className="h-px bg-[var(--fifth-color)] flex-1" />
      </div>

      {/* Newsletter Input */}
      <div className="flex flex-col items-center gap-6 py-8 w-full max-w-xl">
        <span className="text-2xl sm:text-3xl md:text-4xl text-[var(--primary-color)] font-bold tracking-wide text-center">
          STAY IN THE KNOW
        </span>

        <div className="flex flex-col md:gap-0 gap-1 px-4 sm:flex-row w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS*"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 cursor-pointer bg-[var(--primary-color)] text-white rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-opacity-90 transition"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}
