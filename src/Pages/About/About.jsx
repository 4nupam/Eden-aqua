import React from "react";
import AboutHero from "../../Components/SingleComponents/AboutHero";
import NewsLetter from "../../Components/SingleComponents/NewsLetter"
export default function About() {
    const data = [
        {
            txt: "100% Purity",
            logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829597/image_50_aobjjr.png",
        },
        {
            txt: "Safe, BPA-Free Packaging",
            logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829617/image_51_dgmutw.png",
        },
        {
            txt: "6-Step Purification",
            logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829622/image_52_girtrw.png",
        },
        {
            txt: "Green Initiatives",
            logo: "https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829633/image_53_ubjfhe.png",
        },
    ];

    return (
        <div className=" w-full">
            <AboutHero />

            {/* Feature Grid */}
            <div className="flex items-center justify-center w-full px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-[#E0F7FA] p-6 rounded-2xl w-full max-w-6xl shadow-md">
                    {data.map((e, index) => (
                        <div
                            className="flex flex-col items-center justify-center text-center gap-3"
                            key={index}
                        >
                            <img
                                src={e.logo}
                                alt={e.txt}
                                className="w-20 h-20 object-contain"
                            />
                            <span className="text-[#021624] text-base font-medium">
                                {e.txt}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tagline */}
            <div className="w-full px-4 py-10">
                <i className="text-center flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#021624] leading-tight">
                    HYDRATION YOU CAN TRUST.
                    EVERY DROP. EVERY TIME.
                </i>
            </div>

            {/*  */}
            <div className="relative flex flex-col md:flex-row items-center justify-center px-4 py-10 w-full max-w-6xl mx-auto">
                {/* Image */}
                <img
                    src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829657/image_54_yuebbv.png"
                    alt="Eden Aqua"
                    className="w-full md:w-1/2 object-cover rounded-lg"
                />

                {/* Overlapping Text Box */}
                <div className="bg-white text-[#021624] p-6 md:p-8 shadow-2xl hover:shadow-4xl transition-shadow duration-300 rounded-xl md:-ml-10 mt-1 md:mt-0 w-full md:w-[90%] z-10 relative">
                    <p className="text-sm md:text-base leading-relaxed font-medium">
                        At Eden Aqua, we are committed to delivering pure, safe, and refreshing drinking water to every household and business we serve. Founded with the vision of making high-quality hydration accessible to all, we’ve grown into a trusted name in the water packaging industry through our focus on quality, innovation, and sustainability.
                        <br /><br />
                        Our state-of-the-art purification and packaging facilities follow rigorous quality standards and scientific protocols. Each bottle undergoes multiple tests — from physical and chemical analysis to microbiological checks — ensuring every drop meets the highest safety and taste benchmarks.
                        <br /><br />
                        With a strong distribution network, eco-friendly practices, and a team of dedicated professionals, we’re not just packaging water — we’re packaging trust.
                    </p>
                </div>
            </div>

            {/* Environmental Responsibility    */}

            <div
  className="h-auto bg-cover bg-center w-full px-4 py-10"
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750830339/image_37_hhilyn.png')",
  }}
>
  <div className="bg-white text-[#1C2E3A] py-10 px-4 md:px-10 rounded-xl shadow-lg max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Card 1 */}
    <div className="flex flex-col gap-4">
      <img
        src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751275627/America_rrtjjz.svg"
        alt="Environmental Icon"
        className="w-12 h-12"
      />
      <h3 className="text-2xl font-bold">Environmental Responsibility</h3>
      <hr className="border-t-2 border-[#0077B6] w-1/3" />
      <p className="text-sm md:text-lg leading-relaxed">
        Sustainability and environmental responsibility are top priorities for Eden Aqua,
        which continually strives for energy efficiency and waste reduction through recycling
        initiatives and infrastructure improvements.
      </p>
    </div>

    {/* Card 2 */}
    <div className="flex h-[40vh] flex-col gap-4">
      <img
        src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1751275628/Question_Mark_u5lp6j.svg"
        alt="Environmental Icon"
        className="w-12 h-12"
      />
      <h3 className="text-2xl font-bold">DO YOU HAVE ANY QUESTION?</h3>
      <hr className="border-t-2 border-[#0077B6] w-1/3" />
      <p className="text-sm md:text-lg leading-relaxed">
        Sustainability and environmental responsibility are top priorities for Eden Aqua,
        which continually strives for energy efficiency and waste reduction through recycling
        initiatives and infrastructure improvements.
      </p>
    </div>
  </div>
</div>

<NewsLetter/>

        </div>
    );
}
