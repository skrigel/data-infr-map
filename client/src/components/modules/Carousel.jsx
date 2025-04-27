import { useState } from "react";

const items = [
    { title: "Boston Housing Authority", link: "https://residensity.mhp.net" },
    { title: "Age Strong Commission", link: "https://www.arcgis.com/apps/mapviewer/index.html?webmap=055e2474477144ffa7db067f485c9dc7" },
    { title: "City of Boston Digital Equity Team", link: "https://www.boston.gov/departments/broadband-and-cable/broadband-and-digital-equity" },
    { title: "About Boston Public Schools", link: "https://data.census.gov/map?q=demographics+in+all+counties+in+Massachusetts&tid=ACSST5Y2023.S1401&layer=VT_2023_050_00_PY_D1&loc=42.4730,-71.7470,z6.5898" },
    { title: "Immigration Authority", link: "https://www.arcgis.com/apps/mapviewer/index.html?webmap=e6884bf3ec7a476e9d00eebd6fa80cd3" },
    { title: "Tech Goes Home BroadBand Access", link: "https://www.arcgis.com/apps/mapviewer/index.html?webmap=09cf35fad338429bb838269cbd0af64b" },
    { title: "FCC Broadband Map", link :"https://broadbandmap.fcc.gov/location-summary/fixed?version=jun2024&location_id=989bdd7f-75b7-442f-a9af-b4f54ee2f48f&addr1=8148+JESTER+BLVD&addr2=AUSTIN%2C+TX+78750&zoom=8.28&vlon=-97.931796&vlat=30.584117&br=r&speed=100_20&tech=1_2_3_4_5_6_7_8"},
    {title: "Boston Public Library", link: "https://www.bpl.org/about-the-bpl/official-policies/computer-and-network-use/"}
  ];
  

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center p-8">
      <div className="relative w-full max-w-md">
        <div className="flex justify-center items-center h-56 bg-gray-100 rounded-2xl shadow-md transition-all duration-300">
          <a href={items[current].link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-600 hover:underline">
            {items[current].title}
          </a>
        </div>

        <button 
          onClick={prevSlide} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:scale-110 transition"
        >
          ◀
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:scale-110 transition"
        >
          ▶
        </button>
      </div>
      
      {/* Optional Dots */}
      <div className="flex mt-4 space-x-2">
        {items.map((_, index) => (
          <div 
            key={index}
            className={`w-3 h-3 rounded-full ${current === index ? 'bg-blue-600' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;