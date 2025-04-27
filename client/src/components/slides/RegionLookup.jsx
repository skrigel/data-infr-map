
// // // // Slide4_RegionLookup.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { get } from "../../utilities";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const stateAbbrToFips = {
  AL: '01', AK: '02', AZ: '04', AR: '05', CA: '06', CO: '08',
  CT: '09', DE: '10', FL: '12', GA: '13', HI: '15', ID: '16',
  IL: '17', IN: '18', IA: '19', KS: '20', KY: '21', LA: '22',
  ME: '23', MD: '24', MA: '25', MI: '26', MN: '27', MS: '28',
  MO: '29', MT: '30', NE: '31', NV: '32', NH: '33', NJ: '34',
  NM: '35', NY: '36', NC: '37', ND: '38', OH: '39', OK: '40',
  OR: '41', PA: '42', RI: '44', SC: '45', SD: '46', TN: '47',
  TX: '48', UT: '49', VT: '50', VA: '51', WA: '53', WV: '54',
  WI: '55', WY: '56', DC: '11', PR: '72'
};

var states = [{min: 35000, max:36999, code: 'AL', long: "Alabama"},
  {min: 99500, max:99999, code: 'AK', long: "Alaska"},
  {min: 85000, max:86999, code: 'AZ', long: "Arizona"},
  {min: 71600, max:72999, code: 'AR', long: "Arkansas"},
  {min: 90000, max:96699, code: 'CA', long: "California"},
  {min: 80000, max:81999, code: 'CO', long: "Colorado"},
  {min: 6000,  max:6999,  code: 'CT', long: "Connecticut"},
  {min: 19700, max:19999, code: 'DE', long: "Deleware"},
  {min: 32000, max:34999, code: 'FL', long: "Florida"},
  {min: 30000, max:31999, code: 'GA', long: "Georgia"},
  {min: 96700, max:96999, code: 'HI', long: "Hawaii"},
  {min: 83200, max:83999, code: 'ID', long: "Idaho"},
  {min: 60000, max:62999, code: 'IL', long: "Illinois"},
  {min: 46000, max:47999, code: 'IN', long: "Indiana"},
  {min: 50000, max:52999, code: 'IA', long: "Iowa"},
  {min: 66000, max:67999, code: 'KS', long: "Kansas"},
  {min: 40000, max:42999, code: 'KY', long: "Kentucky"},
  {min: 70000, max:71599, code: 'LA', long: "Louisiana"},
  {min: 3900,  max:4999,  code: 'ME', long: "Maine"},
  {min: 20600, max:21999, code: 'MD', long: "Maryland"},
  {min: 1000,  max:2799,  code: 'MA', long: "Massachusetts"},
  {min: 48000, max:49999, code: 'MI', long: "Michigan"},
  {min: 55000, max:56999, code: 'MN', long: "Minnesota"},
  {min: 38600, max:39999, code: 'MS', long: "Mississippi"},
  {min: 63000, max:65999, code: 'MO', long: "Missouri"},
  {min: 59000, max:59999, code: 'MT', long: "Montana"},
  {min: 27000, max:28999, code: 'NC', long: "North Carolina"},
  {min: 58000, max:58999, code: 'ND', long: "North Dakota"},
  {min: 68000, max:69999, code: 'NE', long: "Nebraska"},
  {min: 88900, max:89999, code: 'NV', long: "Nevada"},
  {min: 3000, max:3899, code: 'NH', long: "New Hampshire"},
  {min: 7000, max:8999, code: 'NJ', long: "New Jersey"},
  {min: 87000, max:88499, code: 'NM', long: "New Mexico"},
  {min: 10000, max:14999, code: 'NY', long: "New York"},
  {min: 43000, max:45999, code: 'OH', long: "Ohio"},
  {min: 73000, max:74999, code: 'OK', long: "Oklahoma"},
  {min: 97000, max:97999, code: 'OR', long: "Oregon"},
  {min: 15000, max:19699, code: 'PA', long: "Pennsylvania"},
  {min: 300, max:999, code: 'PR', long: "Puerto Rico"},
  {min: 2800, max:2999, code: 'RI', long: "Rhode Island"},
  {min: 29000, max:29999, code: 'SC', long: "South Carolina"},
  {min: 57000, max:57999, code: 'SD', long: "South Dakota"},
  {min: 37000, max:38599, code: 'TN', long: "Tennessee"},
  {min: 75000, max:79999, code: 'TX', long: "Texas"},
  {min: 88500, max:88599, code: 'TX', long: "Texas"},
  {min: 84000, max:84999, code: 'UT', long: "Utah"},
  {min: 5000, max:5999, code: 'VT', long: "Vermont"},
  {min: 22000, max:24699, code: 'VA', long: "Virgina"},
  {min: 20000, max:20599, code: 'DC', long: "Washington DC"},
  {min: 98000, max:99499, code: 'WA', long: "Washington"},
  {min: 24700, max:26999, code: 'WV', long: "West Virginia"},
  {min: 53000, max:54999, code: 'WI', long: "Wisconsin"},
  {min: 82000, max:83199, code: 'WY', long: "Wyoming"}];


  const fields = [
    { code: "B01003_001E", label: "Total Population" },
    { code: "B28001_002E", label: "Device Ownership" },
    { code: "B28001_005E", label: "Smartphone Owners" },
    { code: "B28003_002E", label: "Total with a Computer" },
    { code: "B28001_003E", label: "Owns Desktops/Laptops" },
    { code: "B28001_011E", label: "No Computer" },
    { code: "B28002_002E", label: "With Internet Subscription" },
    { code: "B28002_005E", label: "With Broadband" },
    { code: "B28002_007E", label: "With Cellular Data Plan" },
    { code: "B28002_013E", label: "No Internet Access" },
    { code: "B28002_009E", label: "Satellite Internet Service" },
  ];


const RegionLookup = () => {
  const [region, setRegion] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stateData, setStateData] = useState(null);
  const [error, setError] = useState("");



  const clear  = () =>{
    setRegion("")
    setData(null)
    setStateData(null);
  }

  const getState = (zipcode) => {
    if (typeof zipcode !== 'string') return false;
    zipcode = parseInt(zipcode, 10);
    const state = states.find(s => s.min <= zipcode && s.max >= zipcode);
    if (!state) return false;
    return stateAbbrToFips[state.code];
  };
  

  const fetchRegionData = async () => {
    if (!region) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const apiKey="af2cf73162a5d8a466c8918ebfc397716c84093c"
      const fieldCodes = fields.map(f => f.code).join(",");

      const url = `https://api.census.gov/data/2023/acs/acs5?get=NAME,${fieldCodes}&for=zip%20code%20tabulation%20area:${region}&key=${apiKey}`;

      const response = await fetch(url);
      const json = await response.json();

      if (json.length > 1) {
        const headers = json[0];
        const values = json[1];
        const result = {};
        headers.forEach((header, index) => {
          result[header] = values[index];
        });
        setData(result);

        
      } else {
        setError("No data found for this ZIP code.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data. Please try again.");
    }


    try {
      // Get State FIPS and fetch State data
      const zip = region.trim();
      const stateFips = getState(zip);
      if (!stateFips) {
        setError("Invalid ZIP code or could not find associated state.");
        return;
      }

      const apiKey="af2cf73162a5d8a466c8918ebfc397716c84093c"
      const fieldCodes = fields.map(f => f.code).join(",");

      const stateUrl = `https://api.census.gov/data/2023/acs/acs5?get=NAME,${fieldCodes}&for=state:${stateFips}&key=${apiKey}`;
      const stateResponse = await fetch(stateUrl);
      const stateJson = await stateResponse.json();
      if (stateJson.length > 1) {
        const headers = stateJson[0];
        const values = stateJson[1];
        const result = {};
        headers.forEach((header, index) => {
          result[header] = values[index];
        });
        setStateData(result);
      } else {
        console.error("State data not found");
      }
    } catch (err) {
      console.error("Failed to fetch state data.", err);
    }

    setLoading(false);
  };

  const createChartData = () => {
    if (!data || !stateData) return { labels: [], datasets: [] };
  
    const zipPopulation = parseInt(data["B01003_001E"], 10) || 1;
    const statePopulation = parseInt(stateData["B01003_001E"], 10) || 1;
  
    // Skip total population itself for chart
    const chartFields = fields.filter(field => field.code !== "B01003_001E");
  
    return {
      labels: chartFields.map(field => field.label),
      datasets: [
        {
          label: `ZIP ${region}`,
          data: chartFields.map(field => {
            const raw = parseInt(data[field.code], 10) || 0;
            return ((raw / zipPopulation) * 100).toFixed(2); // percent
          }),
          backgroundColor: 'rgba(59, 130, 246, 0.6)', // blue
        },
        {
          label: `State Avg`,
          data: chartFields.map(field => {
            const raw = parseInt(stateData[field.code], 10) || 0;
            return ((raw / statePopulation) * 100).toFixed(2); // percent
          }),
          backgroundColor: 'rgba(16, 185, 129, 0.6)', // green
        }
      ]
    };
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      // className="text-black text-center flex flex-col justify-center items-center px-8 py-48 min-h-screen"
        className="text-black text-center flex flex-col justify-center items-center px-8 py-20 min-h-screen overflow-hidden"
    >
      <div className="max-w-6xl w-full">
        <h2 className="text-4xl font-semibold mb-8">What’s Happening In Your Town?</h2>
        <div className="flex gap-2 mb-6">
          <input
            className="w-full border border-gray-300 p-4 rounded text-lg"
            placeholder="Enter your town or zip code"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <button
            onClick={fetchRegionData}
            className="bg-blue-600 text-white p-4 rounded text-lg hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={clear}
            className="bg-gray-600 text-white p-4 rounded text-lg hover:bg-gray-700"
          >
            Clear
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}


        {data && stateData && (
          <>
          <div className="flex flex-col lg:flex-row w-full gap-8 mt-10 max-h-[600px] overflow-y-auto p-4 bg-white rounded shadow">
  {/* Chart Side */}
  <div className="w-full lg:w-1/2">
    <Bar data={createChartData()} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
  </div>

  {/* Table Side */}
  <div className="w-full lg:w-1/2 overflow-x-auto">
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Category</th>
          <th className="border p-2">ZIP Code ({region})</th>
          <th className="border p-2">State Average</th>
        </tr>
      </thead>
      <tbody>
        {fields.filter(f => f.code !== "B01003_001E").map((field) => (
          <tr key={field.code}>
            <td className="border p-2">{field.label}</td>
            <td className="border p-2">
              {data && data[field.code] ? `${((parseInt(data[field.code], 10) / (parseInt(data["B01003_001E"], 10) || 1)) * 100).toFixed(2)}%` : "N/A"}
            </td>
            <td className="border p-2">
              {stateData && stateData[field.code] ? `${((parseInt(stateData[field.code], 10) / (parseInt(stateData["B01003_001E"], 10) || 1)) * 100).toFixed(2)}%` : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
            {/* <div className="mt-10">
              <Bar data={createChartData()} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            </div>

            <table className="w-full mt-10 table-auto border-collapse overflow-y-scroll">
              <thead>
                <tr>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">ZIP Code ({region})</th>
                  <th className="border p-2">State Average</th>
                </tr>
              </thead>
              <tbody>
  {fields.filter(f => f.code !== "B01003_001E").map((field) => (
    <tr key={field.code}>
      <td className="border p-2">{field.label}</td>
      <td className="border p-2">
        {data && data[field.code] ? `${((parseInt(data[field.code], 10) / (parseInt(data["B01003_001E"], 10) || 1)) * 100).toFixed(2)}%` : "N/A"}
      </td>
      <td className="border p-2">
        {stateData && stateData[field.code] ? `${((parseInt(stateData[field.code], 10) / (parseInt(stateData["B01003_001E"], 10) || 1)) * 100).toFixed(2)}%` : "N/A"}
      </td>
    </tr>
  ))}
</tbody>
            </table> */}
          </>
        )}

          
        </div>
         </motion.section>
  );
}; 

export default RegionLookup;




// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

// ChartJS.register(BarElement, CategoryScale, LinearScale);

// const RegionLookup = () => {
//   const [region, setRegion] = useState("");
//   const [zipData, setZipData] = useState(null);
//   const [stateData, setStateData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fields = [
//     { code: "B28001_002E", label: "Device Ownership" },
//     { code: "B28001_005E", label: "Smartphone Owners" },
//     { code: "B28003_002E", label: "Total with a Computer" },
//     { code: "B28001_003E", label: "Owns Desktops/Laptops" },
//     { code: "B28001_011E", label: "No Computer" },
//     { code: "B28002_002E", label: "With Internet Subscription" },
//     { code: "B28002_005E", label: "With Broadband" },
//     { code: "B28002_007E", label: "With Cellular Data Plan" },
//     { code: "B28002_013E", label: "No Internet Access" },
//     { code: "B28002_009E", label: "Satellite Internet Service" },
//   ];

//   const fetchRegionData = async () => {
//     if (!region) return;

//     setLoading(true);
//     setError("");
//     setZipData(null);
//     setStateData(null);

//     try {
//       const apiKey="af2cf73162a5d8a466c8918ebfc397716c84093c" // Insert your key

//       // Fetch ZIP Code Data
//       const zipFields = fields.map(f => f.code).join(",");
//       const zipUrl = `https://api.census.gov/data/2021/acs/acs5?get=NAME,${zipFields},state&for=zip%20code%20tabulation%20area:${region}&key=${apiKey}`;
//       const zipResponse = await fetch(zipUrl);
//       const zipJson = await zipResponse.json();

//       if (zipJson.length <= 1) {
//         throw new Error("No ZIP data found.");
//       }

//       const headers = zipJson[0];
//       const values = zipJson[1];
//       const zipResult = {};
//       headers.forEach((header, index) => {
//         zipResult[header] = values[index];
//       });
//       setZipData(zipResult);

//       const stateCode = zipResult.state;

//       // Fetch State Data
//       const stateUrl = `https://api.census.gov/data/2021/acs/acs5?get=NAME,${zipFields}&for=state:${stateCode}&key=${apiKey}`;
//       const stateResponse = await fetch(stateUrl);
//       const stateJson = await stateResponse.json();

//       if (stateJson.length <= 1) {
//         throw new Error("No state data found.");
//       }

//       const stateHeaders = stateJson[0];
//       const stateValues = stateJson[1];
//       const stateResult = {};
//       stateHeaders.forEach((header, index) => {
//         stateResult[header] = stateValues[index];
//       });
//       setStateData(stateResult);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch data. Please check your ZIP code or try again.");
//     }

//     setLoading(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       fetchRegionData();
//     }
//   };

//   const createChartData = () => {
//     if (!zipData || !stateData) return {};

//     return {
//       labels: fields.map(f => f.label),
//       datasets: [
//         {
//           label: `ZIP ${region}`,
//           data: fields.map(f => parseInt(zipData[f.code]) || 0),
//           backgroundColor: 'rgba(59, 130, 246, 0.6)', // Blue
//         },
//         {
//           label: `State Avg`,
//           data: fields.map(f => parseInt(stateData[f.code]) || 0),
//           backgroundColor: 'rgba(16, 185, 129, 0.6)', // Green
//         }
//       ]
//     };
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0, x: 50 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//       className="text-black text-center flex flex-col justify-center items-center px-8 py-48 min-h-screen"
//     >
//       <div className="max-w-4xl w-full">
//         <h2 className="text-4xl font-semibold mb-8">What’s Happening In Your Town?</h2>
//         <div className="flex gap-2 mb-6">
//           <input
//             className="w-full border border-gray-300 p-4 rounded text-lg"
//             placeholder="Enter your town or zip code"
//             value={region}
//             onChange={(e) => setRegion(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <button
//             onClick={fetchRegionData}
//             className="bg-blue-600 text-white px-6 rounded text-lg hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </div>

//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         {zipData && stateData && (
//           <>
//             <div className="mt-10">
//               <Bar data={createChartData()} />
//             </div>

//             <table className="w-full mt-10 table-auto border-collapse">
//               <thead>
//                 <tr>
//                   <th className="border p-2">Category</th>
//                   <th className="border p-2">ZIP {region}</th>
//                   <th className="border p-2">State Average</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fields.map((field) => (
//                   <tr key={field.code}>
//                     <td className="border p-2">{field.label}</td>
//                     <td className="border p-2">{zipData[field.code]}</td>
//                     <td className="border p-2">{stateData[field.code]}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </>
//         )}
//       </div>
//     </motion.section>
//   );
// };

// export default RegionLookup;