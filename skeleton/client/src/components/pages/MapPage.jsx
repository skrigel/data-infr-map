import "./MapPage.css";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import React, { useRef, useEffect, useState } from "react";
import CollapsePanel from "../modules/CollapsePanel";
import { get, post } from "../../utilities";
import AnimatedPopup from "mapbox-gl-animated-popup";
import Collapsible from "../modules/Collapse";
// import "@arcgis/map-components/dist/components/arcgis-map";
// import "@arcgis/map-components/dist/components/arcgis-legend";
// import "@arcgis/map-components/dist/components/arcgis-search";
// import FontawesomeMarker from "mapbox-gl-fontawesome-markers";
import { MapboxLegendControl } from "@watergis/mapbox-gl-legend";
import "@watergis/mapbox-gl-legend/css/styles.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_CENTER = [-71.057083, 42.361145];
const INITIAL_ZOOM = 10.12;

const MAP_BOUNDS = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(-74.3099, 40.9944),
  new mapboxgl.LngLat(-69.2739, 43.4588)
);

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2tyaWdlbCIsImEiOiJjbTVzdnNkZnQwcmd1Mmxwd2Q4czcxN2h3In0.eEbeS03iSXZwe-_3bzi8Vg";

const Map = ({ onClick, isOpen }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  const [data, setData] = useState(null);

  useEffect(() => {
    get(`/api/facilities`).then((pointsObj) => setData(pointsObj));
  }, []);
  console.log("data:", data);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/skrigel/cm5wnzuqw00ly01s3a91ieup2", // Mapbox style URL
      center: center,
      zoom: zoom,
      maxBounds: MAP_BOUNDS,
    });
    console.log("data again:", data);

    map.current.on("load", () => {
      map.current.addSource("points", {
        type: "geojson",
        id: "DataCenters",
        data: data,
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

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // map.current.addControl(new MapboxLegendControl({}, { reverseOrder: false }), "top-left");

      const popup = new AnimatedPopup({
        closeButton: false,
        closeOnClick: false,
        openingAnimation: {
          duration: 1000,
          easing: "easeOutElastic",
          transform: "scale",
        },
        closingAnimation: {
          duration: 300,
          easing: "easeInBack",
          transform: "scale",
        },
      });
      // const popup = new mapboxgl.Popup({
      //   closeButton: false,
      //   closeOnClick: false,
      // });

      map.current.on("click", "circle", (e) => {
        map.current.flyTo({
          center: e.features[0].geometry.coordinates,
        });
        onClick();
      });

      map.current.on("mouseenter", "circle", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // build our popup html with our geoJSON properties
        const popupHtml = `<strong>Name: ${properties.name}</strong><br><br>
        <strong>Address: ${properties.address + ", " + properties.locality}<br><br></strong>
        <strong>Company: ${properties.company}</strong>`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(popupHtml).addTo(map.current);
      });
      // Whe the cursor moves off the layer we remove the cursor
      map.current.on("mouseleave", "circle", () => {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
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
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom:{" "}
        {zoom.toFixed(2)}
      </div>
    </>
  );
};

const MapPage = () => {
  const [isOpen, setOpen] = useState(false);

  const togglePanel = () => setOpen((prev) => !prev);

  return (
    <div>
      <NavBar></NavBar>
      <Collapsible isOpen={isOpen} onClick={togglePanel} title={"Panel"}></Collapsible>
      {/* <CollapsePanel onClick={togglePanel} isOpen={panelOpen} /> */}
      <Map onClick={togglePanel} isOpen={isOpen}></Map>
      <Footer></Footer>
    </div>
  );
};

export default MapPage;
