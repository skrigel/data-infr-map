// useEffect(() => {
//   handleCloseDemoPanel();
//   if (selPoint) {
//     setRegion(selPoint.county);
//   }

//   //debugging statements
//   // console.log("selpoint", selPoint);
//   // console.log(region);
// }, [selPoint]);

// useEffect(() => {
//   if (demoPanelOpen && tractData) {
//     queryByCounty(selPoint, tractData);
//     console.log(demoTypeToFields);
//     console.log("demo", demoData);
//     console.log(year);
//   }
// }, [demoPanelOpen, demoType, year]);

// const handleCloseDemoPanel = () => {
//   setDemoPanelOpen(false);
// };

{
  /* {demoPanelOpen && (
          <div className="sidebar-bottom">
            <button onClick={handleCloseDemoPanel} className="close-button">
              Close
            </button>
            <h3>Demographic Data: {region}</h3>
            <div className="sidebar-buttons">
              <div style={{ maxHeight: "300px", overflow: "scroll" }}>
                {demoTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setDemoType(type)}
                    style={{ backgroundColor: demoType === type ? "#444" : "#555", fontSize: 14 }}
                  >
                    {type.replace("_", " AND ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-table">
              <CensusDataTable censusData={demoData}></CensusDataTable>
            </div>
          </div>
        )} */
}

// const craftCensusAPIQuery = (targetData, variableNames) => {
//   const GEOID = targetData.properties.GEOID;

//   // Extract state FIPS and county FIPS from GEOID
//   const stateFIPS = GEOID.substring(0, 2); // First 2 digits represent state FIPS
//   const countyFIPS = GEOID.substring(2); // Remaining digits represent county FIPS

//   // Join variables into a comma-separated list
//   const variables = variableNames.join(",");

//   // Construct the API query URL
//   const apiUrl = `https://api.census.gov/data/${year}/${survey}?get=NAME,${variables}&for=county:${countyFIPS}&in=state:${stateFIPS}&key=${CENSUS_API_KEY}`;

//   return apiUrl;
// };

// const queryByCounty = () => {
//   const matchingObjects = tractData.features.filter((obj) => obj.properties.COUNTY === region);

//   const variableNames = demoTypeToFields[demoType];

//   let censusURL = craftCensusAPIQuery(matchingObjects[0], variableNames);

//   // Extract relevant variables for matching objects
//   get_external(censusURL).then((apiData) => {
//     console.log("api data", apiData);
//     setDemoData(apiData);
//     console.log("demo", demoData);
//   });
// };
