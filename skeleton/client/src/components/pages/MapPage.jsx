import "./MapPage.css";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import React, { useRef, useEffect } from "react";
// import "@arcgis/map-components/dist/components/arcgis-map";
// import "@arcgis/map-components/dist/components/arcgis-legend";
// import "@arcgis/map-components/dist/components/arcgis-search";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2tyaWdlbCIsImEiOiJjbTVzdnNkZnQwcmd1Mmxwd2Q4czcxN2h3In0.eEbeS03iSXZwe-_3bzi8Vg";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", // Mapbox style URL
      center: [-98.5795, 39.8283], // Center of the United States
      zoom: 4,
    });
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};

const MapPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Map></Map>
      <Footer></Footer>
    </div>
  );
};

export default MapPage;
