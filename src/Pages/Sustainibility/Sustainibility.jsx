import React from "react";
import FinalTest from "../../Components/SingleComponents/FinalTest";
import NewsLetter from "../../Components/SingleComponents/NewsLetter"

export default function Sustainibility() {
    return (
        <div
            className="flex flex-col min-h-screen w-full py-8"
            style={{
                background: "linear-gradient(to bottom, #FFFFFF, #EFFBFD, #FFFFFF, #E0F7FA)",
            }}
        >
            {/* Breadcrumb */}
            <div className="text-sm font-bold text-[#0077B6] px-6 mb-6">
                <span className="text-black">HOME :</span> SUSTAINBILITY
            </div>

            {/* Heading */}
            <div className="flex items-center justify-center text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#1C2E3A] font-bold">
                    The Eden Aqua Assurance
                </h1>
            </div>

            {/*  */}

            <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-stretch px-4 py-8 mt-12 relative">
                {/* Left Image Section */}
                <div className="flex-shrink-0">
                    <img
                        src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829528/image_32_ocobod.png"
                        alt="Quality Check"
                        className="hidden md:block md:w-52 h-full object-contain"
                    />
                </div>

                {/* Background Image (absolute decorative) */}
                <img
                    src="https://res.cloudinary.com/dt4ohfuwc/image/upload/v1750829515/image_33_nhgqv7.png"
                    alt=""
                    className="absolute left-52 -top-4 w-24 md:w-28  pointer-events-none"
                />

                {/* Right Text Section */}
                <div className="flex flex-col justify-center bg-[#021624] text-white px-6 py-18  md:rounded-r-2xl shadow-md w-full h-full">
                    <i className="text-xl md:text-2xl font-semibold mb-3">
                        Measured by 90 Industry-Grade Quality Standards
                    </i>
                    <p className="text-sm md:text-base leading-relaxed">
                        We adhere to stringent quality control protocols during every stage of production. At our state-of-the-art facilities, a scientifically advanced and meticulously monitored process ensures that every bottle delivers the same pure, safe, and healthy drinking water to our consumers.
                    </p>
                </div>
            </div>
            {/* 67 Final Tests to Guarantee Purity */}
            <div className="w-full flex items-center justify-center">

                <FinalTest />
            </div>

            {/* 19  Tests on Container */}

            <div className="flex flex-col md:flex-row items-stretch gap-3 w-full max-w-full mx-auto  py-6">
                {/* Left Section */}
                <div className="bg-[#1C2E3A] text-white flex items-center justify-center text-center p-4 py-22 rounded-r-lg shadow-md w-full md:w-1/2">
                    <i className="text-xl md:text-3xl font-semibold">19 Tests on Container</i>
                </div>

                {/* Right Section */}
                <div className=" text-[#1C2E3A] p-4 rounded-lg  w-full md:w-1/2 flex items-center">
                    <span className="text-sm md:text-base leading-relaxed">
                        <strong>Visual Inspection:</strong> Labelling, date coding, bottle and cap condition - 3 tests. <br />
                        <strong>Container Testing:</strong> 16 tests (7 for container capacity, strength and appearance, and 9 for specific migration of container).
                    </span>
                </div>
            </div>
 <div className="flex flex-col md:flex-row items-stretch gap-3 w-full max-w-full mx-auto  py-6">
             
             {/* Right Section */}
                <div className=" text-[#1C2E3A] p-4 rounded-lg  w-full md:w-1/2 flex items-center">
                    <span className="text-sm md:text-base leading-relaxed">
                        Fill height of FG, Torque test of FG, Ozone test of FG, Activated carbon test.<br />
                        {/* <strong>Container Testing:</strong> 16 tests (7 for container capacity, strength and appearance, and 9 for specific migration of container). */}
                    </span>
                </div>
                {/* Left Section */}
                <div className="bg-[#1C2E3A] text-white flex items-center justify-center text-center p-4 py-22 rounded-l-lg shadow-md w-full md:w-1/2">
                    <i className="text-xl md:text-3xl font-semibold">4 Tests on Intermediate Product</i>
                </div>

                
            </div>

<NewsLetter/>
        </div>
    );
}
