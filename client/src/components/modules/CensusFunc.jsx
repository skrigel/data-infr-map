//code to potnentially be reused later

const demoTypeToFields = {
  sex_citizenship: [
    "B05003_001E",
    "B05003_002E",
    "B05003_013E",
    "B05002_026E",
    "B16008_020E",
    "B05007_027E",
    "B05007_014E",
    "B05007_040E",
    "B05007_094E",
  ],
  family_households: [
    "B05009_002E",
    "B05009_020E",
    "B05003_014E",
    "B05003_003E",
    "B05010_019E",
    "B05010_023E",
    "B07008_002E",
    "B07008_003E",
    "B07008_004E",
    "B11001_002E",
    "B11001_007E",
    "B11001_008E",
  ],
  income_poverty: [
    "B06010_003E",
    "B06010_002E",
    "B19013_001E",
    "B06010_004E",
    "B06010_005E",
    "B06010_006E",
    "B06010_007E",
    "B06010_009E",
    "B06010_010E",
    "B06010_011E",
    "B19001_014E",
    "B19001_015E",
    "B19001_016E",
    "B19001_017E",
    "B17001_003E",
    "B17001_017E",
  ],
  education: [
    "B15002_010E",
    "B15002_011E",
    "B15002_014E",
    "B15002_015E",
    "B15002_016E",
    "B15002_018E",
    "B15002_028E",
    "B15002_028E",
    "B15002_031E",
    "B15002_032E",
    "B15002_033E",
    "B15002_035E",
    "B15012_009E",
    "B15012_010E",
    "B15012_012E",
    "B15012_013E",
    "B15012_014E",
    "B14003_031E",
    "B14003_040E",
    "B14003_003E",
    "B14003_012E",
  ],
  computer_internet: [
    "B28001_002E",
    "B28001_005E",
    "B28003_002E",
    "B28001_003E",
    "B28001_011E",
    "B28002_002E",
    "B28002_005E",
    "B28002_005E",
    "B28002_013E",
    "B28002_013E",
    "B28002_009E",
  ],
  labor: [
    "B23025_002E",
    "B23025_004E",
    "B23025_005E",
    "B23025_007E",
    "B20005_050E",
    "B20005_003E",
    "B23022_004E",
    "B23022_028E",
    "B20005_050E",
    "B20005_003E",
    "B08526_002E",
    "B08526_003E",
    "B08526_004E",
    "B08526_006E",
    "B08526_007E",
    "B08526_008E",
    "B08526_009E",
    "B08526_010E",
    "B08526_011E",
    "B08526_012E",
    "B08526_014E",
  ],
};
const demoTypes = [
  "sex_citizenship",
  "income_poverty",
  "education",
  "computer_internet",
  "family_households",
  "labor",
];

// const year = "2023";
const survey = "acs/acs5";

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
