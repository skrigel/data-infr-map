import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
// import MapPage from "./MapPage";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import Intro from "../slides/Intro";
import Stats from "../slides/Stats";
import MapSlide from "../slides/MapSlide";
import RegionLookup from "../slides/RegionLookup";
import CallToAction from "../slides/CallToAction";


const slides = [
  { id: 1, title: "Introduction", component: <Intro />, content: "Welcome to the story" },
  { id: 2, title: "National Stats", component: <Stats />, content: "Overview of US infrastructure" },
  { id: 3, title: "Map Explorer", component: <MapSlide />, content: "Explore the map of Massachusetts" },
  { id: 4, title: "Region Lookup", component: <RegionLookup />, content: "Search local data" },
  { id: 5, title: "Call to Action", component: <CallToAction />, content: "Find resources and next steps" },
];

export default function ScrollytellingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <NavBar className='fixed mt-0'/>
      <div className="flex">
        {/* Sticky Sidebar (Text) */}
        <div className="w-1/4 h-screen sticky top-0 flex flex-col justify-center p-8 bg-gray-100">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`mb-6 p-4 rounded-lg transition-opacity ${
                activeIndex === index ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
            >
              <h2 className="text-xl font-bold">{slide.title}</h2>
              <p>{slide.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Slides */}
        <div className="w-3/4">
        {[
  <Intro key="intro" />,
  <Stats key="stats" />,
  <MapSlide key="map" />,
  <RegionLookup/>,
  <CallToAction/>
].map((component, index) => (
  <div
    key={index}
    ref={(el) => (sectionRefs.current[index] = el)}
    className="flex justify-center items-center px-4"
  >
    <motion.div
      className="w-full max-w-5xl mx-auto"
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: activeIndex === index ? 1 : 0.5,
      }}
      transition={{ duration: 0.5 }}
    >
      {component}
    </motion.div>
  </div>
))}
        </div>
      </div>
      <Footer />
    </div>
  );
}