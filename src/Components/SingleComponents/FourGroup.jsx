import React from "react";

export default function FourGroup({ background = false, data }) {


    return (
        <div
            className={`grid grid-cols-1 w-full mx-auto md:grid-cols-4 items-center px-6 justify-center gap-8 py-8 ${background ? "bg-[var(--primary-color)]" : "bg-transparent"
                }`}
        >
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`flex flex-col gap-4 ${ background ? "text-white" : "text-black"} items-center max-w-xs text-center`}
                >
                    <div className="bg-[var(--tertiary-color)] rounded-full p-1 flex items-center justify-center w-24 h-24 shadow-md">
                        <img
                            src={item.logo}
                            alt={item.txt}
                            className="object-contain"
                        />
                    </div>

                    <div className="w-[90%] h-[1px] bg-[var(--sixth-color)] rounded" />

                    <span className={`text-base  ${ background ? "font-light" :" font-semibold"} tracking-wide`}>{item.txt}</span>
                </div>
            ))}
        </div>
    );
}
