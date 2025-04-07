// Slide5_CallToAction.jsx
import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center text-black flex flex-col justify-center items-center px-8 py-48 min-h-screen"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6">Take Action</h2>
        <p className="text-xl mb-6">Find grants, join local initiatives, or share your story.</p>
        <a
          href="https://broadband.masstech.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded text-xl hover:bg-blue-700 transition"
        >
          Explore Resources
        </a>
      </div>
    </motion.section>
  );
};

export default CallToAction;