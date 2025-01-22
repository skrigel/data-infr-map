import React, { useState, useEffect } from "react";

const variableNames = {
  B05003_001E: "Total Population",
  B05003_002E: "Total Male",
  B05003_013E: "Total Female",
  B05002_026E: "Non-US Citizens",
  B16008_020E: "Naturalized Citizens",
  B05007_027E: "From Asia",
  B05007_014E: "From Europe",
  B05007_040E: "From Latin America",
  B05007_094E: "From Other Areas",

  B23025_002E: "Total in Labor Force",
  B23025_004E: "Employed in Labor Force",
  B23025_005E: "Unemployed in Labor Force",
  B23025_007E: "Not in Labor Force",
  B20005_050E: "Employed Full-time, Female",
  B20005_003E: "Employed Full-time, Male",
  B23022_004E: "Worked 35+ Hours Weekly, Male",
  B23022_028E: "Worked 35+ Hours Weekly, Female",
  B08526_002E: "Employed in Agriculture/Forestry",
  B08526_003E: "Employed in Construction",
  B08526_004E: "Employed in Manufacturing",
  B08526_006E: "Employed in Retail trade",
  B08526_007E: "Employed in Transportation/Utilities",
  B08526_008E: "Employed in Information",
  B08526_009E: "Employed in Finance, Insurance, and Real Estate",
  B08526_010E: "Employed in Professional, Scientific, and Management Services",
  B08526_011E: "Employed in Education, Health Care, Social Assistance",
  B08526_012E: "Employed in Arts, Entertainment, Food Services",
  B08526_014E: "Employed in Public Administration",

  B05009_002E: "Under 6 Years",
  B05009_020E: "6 to 17 Years",
  B05003_014E: "Female, Under 18",
  B05003_003E: "Male, Under 18",
  B05010_019E: "Living with two Parents",
  B05010_023E: "Living with one Parent",
  B07008_002E: "Never Married",
  B07008_003E: "Married",
  B07008_004E: "Divorced",
  B11001_002E: "Family Households",
  B11001_007E: "Nonfamily Households",
  B11001_008E: "Total Living Alone",
  B11009_004E: "Same-Sex Married Households",
  B11009_003E: "Opposite-sex Married Households",
  B11017_002E: "Multigenerational Households",
  B12007_001E: "Median Age at First Marriage, Male",
  B12007_002E: "Median Age at First Marriage, Female",

  B15002_010E: "Male, No High School Diploma",
  B15002_011E: "Male, High School Graduate",
  B15002_014E: "Male, Associate's Degree",
  B15002_015E: "Male, Master's Degree",
  B15002_016E: "Male, Master's Degree",
  B15002_018E: "Male, Doctorate Degree",

  B15002_028E: "Female, No High School Diploma",
  B15002_028E: "Female, High School Graduate",
  B15002_031E: "Female, Associate's Degree",
  B15002_032E: "Feale, Bachelor's Degree",
  B15002_033E: "Female, Master's Degree",
  B15002_035E: "Female, Master's Degree",
  B15012_009E: "Degrees in Science and Engineering",
  B15012_010E: "Degrees in Business",
  B15012_012E: "Degrees in Liberal Arts and History",
  B15012_013E: "Degrees in Liberal Arts and History",
  B15012_014E: "Degrees in Visual and Performing Arts",
  B14003_031E: "Enrolled in Public School, Female",
  B14003_040E: "Enrolled in Private School, Female",
  B14003_003E: "Enrolled in Public School, Male",
  B14003_012E: "Enrolled in Private School, Male",

  B06010_003E: "Total With Income",
  B06010_002E: "Total With No Income",
  B19013_001E: "Median Household Income (2023 Inflation-Adjusted)",
  B06010_004E: "With Income $1 to $9,999 or less",
  B06010_005E: "With Income $10,000 to $14,999",
  B06010_006E: "With Income $15,000 to $24,999",
  B06010_007E: "With Income $25,000 to $34,999",
  B06010_009E: "With Income $50,000 to $64,999",
  B06010_010E: "With Income $65,000 to $74,999",
  B06010_011E: "With Income $75,000 or more",
  B19001_014E: "With Income $100,000 to 124,999",
  B19001_015E: "With Income $125,000 to 149,999",
  B19001_016E: "With Income $150,000 to 199,999",
  B19001_017E: "With Income $200,000 or more",
  B17001_003E: "Income Below Poverty Level, Male",
  B17001_017E: "Income Below Poverty Level, Female",

  B28001_002E: "Owns at least one type of Computing Device",
  B28001_005E: "Smartphone Owners",
  B28003_002E: "Total with a Computer",
  B28001_003E: "Owns at least one Device Including Desktops/Laptops",
  B28001_011E: "With no computer",
  B28002_002E: "With Internet Subscription",
  B28002_005E: "With Broadband of any type",
  B28002_005E: "With Cellular Data Plan",
  B28002_013E: "Internet access Without Subscription",
  B28002_013E: "No Internet access",
  B28002_009E: "With Satellite Internet Service",
};

const CensusDataTable = ({ censusData }) => {
  if (!censusData || censusData.length === 0) {
    return <p>No data to display.</p>;
  }

  // Assuming the first item contains the keys for headers
  const rows = censusData[0].map((header, index) => ({
    index,
    name: header,
    value: censusData[1][index], // Access value from the second subarray
  }));

  return (
    <div style={{ maxHeight: "300px", overflow: "scroll" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", backgroundColor: "#f2f2f2", color: "black" }}>
              Index
            </th>
            <th style={{ border: "1px solid black", backgroundColor: "#f2f2f2", color: "black" }}>
              Name
            </th>
            <th style={{ border: "1px solid black", backgroundColor: "#f2f2f2", color: "black" }}>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.index}>
              <td style={{ border: "1px solid black" }}>{row.index}</td>
              <td style={{ border: "1px solid black" }}>
                {row.name in variableNames ? variableNames[row.name] : row.name}
              </td>
              <td style={{ border: "1px solid black" }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CensusDataTable;
