import "./MapPage.css";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import React, { useRef, useEffect, useState } from "react";
import CollapsePanel from "../modules/CollapsePanel";
// import "@arcgis/map-components/dist/components/arcgis-map";
// import "@arcgis/map-components/dist/components/arcgis-legend";
// import "@arcgis/map-components/dist/components/arcgis-search";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_CENTER = [-71.057083, 42.361145];
const INITIAL_ZOOM = 10.12;

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2tyaWdlbCIsImEiOiJjbTVzdnNkZnQwcmd1Mmxwd2Q4czcxN2h3In0.eEbeS03iSXZwe-_3bzi8Vg";

const Map = ({ onClick, isOpen }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/skrigel/cm5wnzuqw00ly01s3a91ieup2", // Mapbox style URL
      center: center, // Center of the United States
      zoom: zoom,
    });

    map.current.on("load", () => {
      map.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [-71.057083, 42.361145],
              },
            },
          ],
        },
      });

      map.current.addLayer({
        id: "circle",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": "#4264fb",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });

      map.current.on("click", "circle", (e) => {
        map.current.flyTo({
          center: e.features[0].geometry.coordinates,
        });
        onClick();
      });

      map.current.on("mouseenter", "circle", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "circle", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });

    map.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = map.current.getCenter();
      const mapZoom = map.current.getZoom();

      // update state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      map.current.remove();
    };
  }, []);

  const handleZoomInClick = () => {
    map.current.flyTo({
      center: center,
      zoom: zoom + 1,
    });
  };

  const handleZoomOutClick = () => {
    map.current.flyTo({
      center: center,
      zoom: zoom - 1,
    });
  };

  const handleButtonClick = () => {
    map.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  return (
    <>
      <div id="map-container" ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
      <button className="reset-button" onClick={handleButtonClick}>
        Reset
      </button>
      <button className="zoom-in-button" onClick={handleZoomInClick}>
        +
      </button>
      <button className="zoom-out-button" onClick={handleZoomOutClick}>
        -
      </button>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom:{" "}
        {zoom.toFixed(2)}
      </div>
    </>
  );
};

const MapPage = () => {
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => setPanelOpen((prev) => !prev);

  return (
    <div>
      <NavBar></NavBar>
      <CollapsePanel onClick={togglePanel} isOpen={panelOpen} />
      <Map onClick={togglePanel}></Map>
      <Footer></Footer>
    </div>
  );
};

export default MapPage;
