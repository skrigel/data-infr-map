// Slide1_Intro.jsx
import React from "react";
import { motion } from "framer-motion";

const Intro = () => {
    return (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white text-black text-center flex flex-col justify-center items-center px-8 py-48 min-h-screen"
        >
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-8">Not All Connections Are Created Equal</h1>
            <p className="text-2xl">
              Over 20 million Americans still lack access to high-speed internet. Digital equity
              starts with infrastructure.
            </p>
          </div>
        </motion.section>
      );
};

export default Intro;
