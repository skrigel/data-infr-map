// Slide5_CallToAction.jsx
import React from "react";
import { motion } from "framer-motion";
import Carousel from '../modules/Carousel'
const CallToAction = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center text-black flex flex-col justify-center items-center px-8 py-48 min-h-screen"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6">Learn More</h2>
        <p className="text-xl mb-6">Find programs, join local initiatives, and educate yourself.</p>
         <Carousel></Carousel>
      
      </div>
    </motion.section>
  );
};

export default CallToAction;