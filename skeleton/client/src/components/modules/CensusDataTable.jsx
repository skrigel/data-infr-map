import React, { useState, useEffect } from "react";

const variableNames = { B01003_001E: "Total Population" };

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
    <div style={{ maxHeight: "300px", border: "1px solid #ccc" }}>
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
