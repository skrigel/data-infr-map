import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const MapLegend = ({ level, setLevel }) => {
  // start with by level
  //try this later
  return (
    <div className="space-x-64">
      <div className="mb-4 mt-2 inline-block">
        <header className="">
          <strong> Filter by Region: </strong>
          <Button className="bg-gray-400 border-2 border-black" onClick={() => setLevel("tracts")}>
            By Tract
          </Button>
          <Button
            className="bg-gray-400 border-1 border-black"
            onClick={() => setLevel("counties")}
          >
            By County
          </Button>
          <Button
            className="bg-gray-400 border-2 border-black"
            onClick={() => setLevel("county_subdivisions")}
          >
            By County Subdivision
          </Button>
          <Button className="bg-gray-400 border-2 border-black" onClick={() => setLevel("places")}>
            By Incorporated Place
          </Button>
          <Button
            className="bg-gray-400 border-2 border-black"
            onClick={() => setLevel("block_groups")}
          >
            By Block Group
          </Button>
        </header>
      </div>
    </div>
  );
};

export default MapLegend;
