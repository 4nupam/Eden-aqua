import React, { useState, useEffect } from "react";
import quotesData from "../../assets/Quote.json"; // adjust path as needed

export default function QuotesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const quotes = quotesData;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="max-w-full mx-auto p-6 py-20 bg-white  text-center">
      <blockquote className=" text-3xl sm:text-4xl italic text-gray-800 mb-4 transition-opacity duration-700 ease-in-out">
        “{quotes[currentIndex].quote}”
      </blockquote>
      <cite className="block text-lg font-semibold text-gray-600">
        — {quotes[currentIndex].author}
      </cite>
    </div>
  );
}
