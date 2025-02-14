import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MapPage from "./MapPage";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";

const sections = [
  {
    id: 1,
    title: "Introduction",
    content: "Welcome!",
    divContent: "Come along as we explore data centers in Massachusetts!",
  },
  {
    id: 2,
    title: "Map Explorer",
    content: "As you scroll, the story builds up...",
    divContent: "",
  },
  {
    id: 3,
    title: "Climax",
    content: "The most exciting part happens here!",
    divContent: "To Fill",
  },
  {
    id: 4,
    title: "Conclusion",
    content: "The story wraps up as you reach the end.",
    divContent: "To Fill",
  },
];

export default function ScrollytellingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = { threshold: 0.5 }; // Trigger when 50% of a section is visible

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target);
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    <MapPage></MapPage>;

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <div className="flex">
        {/* Sticky Sidebar (Text) */}
        <div className="w-1/4 h-screen sticky top-0 flex flex-col justify-center p-8 bg-gray-100">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`mb-6 p-4 rounded-lg transition-opacity ${
                activeIndex === index ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: activeIndex === index ? 1 : 0.3 }}
            >
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p>{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Visuals */}
        <div className="w-3/4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => (sectionRefs.current[index] = el)}
              className="h-screen flex justify-center items-center text-center"
            >
              {section.title === "Map Explorer" ? (
                <motion.div
                  className="w-3/4 h-2/3 flex items-center justify-center bg-transparent"
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {" "}
                  <MapPage></MapPage>
                </motion.div>
              ) : (
                <motion.div
                  className="w-3/4 h-2/3 flex items-center justify-center bg-blue-300 rounded-lg shadow-lg"
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0.5,
                    scale: activeIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl font-bold">{section.divContent}</h1>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
