
// Slide4_RegionLookup.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const RegionLookup = () => {
  const [region, setRegion] = useState("");

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className=" text-black text-center flex flex-col justify-center items-center px-8 py-48 min-h-screen"
    >
      <div className="max-w-xl w-full">
        <h2 className="text-4xl font-semibold mb-8">What’s Happening In Your Town?</h2>
        <input
          className="w-full border border-gray-300 p-4 rounded mb-6 text-lg"
          placeholder="Enter your town or zip code"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <div className="text-left text-lg text-gray-700">
          <p><strong>Example:</strong> Broadband funding bill passed in 2023 targeting underserved communities.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default RegionLookup;