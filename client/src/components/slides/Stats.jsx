
// Slide2_NationalStats.jsx
import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
    return (
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className=" text-black text-center flex flex-col justify-center items-center px-8 py-48 min-h-screen"
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl font-semibold mb-8">The State of the Net: A National Snapshot</h2>
            <ul className="text-2xl space-y-6">
              <li>Only 65% of rural areas have broadband-level internet.</li>
              <li>Urban households are 2x more likely to have fiber access.</li>
              <li>Low-income communities remain the least connected.</li>
            </ul>
          </div>
        </motion.section>
      );
};

export default Stats;