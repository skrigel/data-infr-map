// Slide3_Map.jsx
import React from "react";
import { motion } from "framer-motion";
import MapPage from "../pages/MapPage";
const MapSlide = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white text-black w-full"
    >
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Explore Massachusetts Infrastructure
        </h2>
        <div className="w-full h-[400px]">
          <MapPage />
        </div>
      </div>
    </motion.section>
  );
};

export default MapSlide;