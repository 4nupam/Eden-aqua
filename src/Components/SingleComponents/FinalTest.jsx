import React from "react";
import SustainCard from "../../Components/Cards/SustainCard";

export default function FinalTest() {
  const data = [
    "We perform six sensory and physical tests to ensure every bottle meets essential standards for color, taste, TDS, and pH.",
    "General parameters: 25 tests are conducted internally and by external labs to confirm that all chemical parameters in water are meeting legal requirements like alkalinity, calcium, magnesium, etc.",
    "Toxic substances: 9 tests are done through external labs to check for presence of toxic substances like mercury, arsenic, lead, etc. These tests are done every six months.",
    "Radioactive residues: 2 tests are done to determine the presence of radioactive residues like alpha & beta emitters in water which are harmful to the human body. These are conducted as per legal standards.",
    "Microbiological requirements: 9 tests are carried out to ensure specified microorganisms are within specifications. 6 tests are conducted daily in-house; 3 are done monthly by external labs.",
    "Pesticide residues: 16 tests are conducted every 6 months to check for any pesticides in the final product.",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-4 py-12 w-full">
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center text-[#1C2E3A] leading-tight">
        67 Final Tests to Guarantee Purity
      </h2>

      <div className="flex flex-wrap justify-center gap-12 px-8 w-full max-w-7xl">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[280px] max-w-[360px]"
          >
            <SustainCard text={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
