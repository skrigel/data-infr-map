import "./MapPage.css";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import ReactDOM from "react-dom";
import React, { Component, useRef, useEffect, useState } from "react";

import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { get, post } from "../../utilities";

import { useCollapse } from "react-collapsed";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import SideBar from "../modules/Sidebar";
import PopupPanel from "../modules/PopupPanel";

const INITIAL_CENTER = [-71.057083, 42.361145];
const INITIAL_ZOOM = 10.12;

const MAP_BOUNDS = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(-74.3099, 40.9944),
  new mapboxgl.LngLat(-70.2739, 42.9)
);

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2tyaWdlbCIsImEiOiJjbTVzdnNkZnQwcmd1Mmxwd2Q4czcxN2h3In0.eEbeS03iSXZwe-_3bzi8Vg";

// const Popup = ({ routeName, routeNumber, city, type }) => (
//   <div className="popup">
//     <h3 className="loc-name">{routeName}</h3>
//     <div className="loc-metric-row">
//       <h4 className="row-title">Route #</h4>
//       <div className="row-value">{routeNumber}</div>
//     </div>
//     <div className="loc-metric-row">
//       <h4 className="row-title">Route Type</h4>
//       <div className="row-value">{type}</div>
//     </div>
//     <p className="loc-city">Serves {city}</p>
//   </div>
// );

const Map = () => {
  const mapContainer = useRef(null);
  // const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const map = useRef(null);

  // const [level, setLevel] = useState("tract");

  // const handleSetLevel = () => {
  //   // implement logic here
  // };
  const [centerData, setCenterData] = useState(null);
  const [tractData, setTractData] = useState(null);
  // const [isOpen, setOpen] = useState(false);
  const [selPoint, setSelPoint] = useState(null);
  const [levelData, setLevelData] = useState(null);

  useEffect(() => {
    get(`/api/facilities`).then((pointsObj) => setCenterData(pointsObj));
  }, []);

  useEffect(() => {
    get(`/api/census_tracts`).then((pointsObj) => setTractData(pointsObj));
  }, []);

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/skrigel/cm5wnzuqw00ly01s3a91ieup2", // Mapbox style URL
      center: center,
      zoom: zoom,
      maxBounds: MAP_BOUNDS,
    });

    map.current.on("load", () => {
      if (centerData && tractData) {
        console.log(tractData.features[0]);
        map.current.addSource("points", {
          type: "geojson",
          data: centerData,
        });

        map.current.addSource("tracts", {
          type: "geojson",
          data: tractData,
        });

        map.current.addLayer({
          id: "tract",
          type: "fill",
          source: "tracts",
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0,
          },
        });

        map.current.addLayer({
          id: "outline",
          type: "line",
          source: "tracts",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });

        map.current.addLayer({
          id: "circle",
          type: "circle",
          source: "points",
          paint: {
            "circle-color": "#4264fb",
            "circle-radius": 8,
            "circle-stroke-width": 3,
            "circle-stroke-color": "#ffffff",
          },
        });
      }

      map.current.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          countries: "us",
          position: "top-right",
          placeholder: "Search here!",
        })
      );

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // map.current.addControl(new MapboxLegendControl({}, { reverseOrder: false }), "top-left");

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      const levelPopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.current.on("click", "circle", (e) => {
        // Open the popup block
        map.current.flyTo({
          center: e.features[0].geometry.coordinates,
        });
        setSelPoint(e.features[0].properties);

        // setIsOpen();
      });

      map.current.on("click", "tract", (e) => {
        // Open the popup block
        // const coordinates = e.features[0].geometry.coordinates;
        const coordinates = e.features[0].geometry.coordinates;
        // console.log(coordinates[0]);
        // const testCoords = new mapboxgl.LngLat(coordinates[0]);
        let latitudes = [];
        let longitudes = [];
        coordinates[0].forEach((coord) => {
          if (Array.isArray(coord) && coord.length === 2) {
            const [lat, lon] = coord;
            latitudes.push(lat);
            longitudes.push(lon);
          }
        });

        // Calculate average lat and lon
        const averageLatitude = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
        const averageLongitude = longitudes.reduce((sum, lon) => sum + lon, 0) / longitudes.length;

        const avgCoords = [averageLatitude, averageLongitude];
        const properties = e.features[0].properties;

        // build our popup html with our geoJSON properties
        const popupH = `<strong>${properties.NAME}</strong>`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        // Populate the popup and set its coordinates
        // based on the feature found.
        levelPopup.setLngLat(avgCoords).setHTML(popupH).addTo(map.current);
      });

      map.current.on("mouseenter", "circle", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

        // build our popup html with our geoJSON properties
        const popupHtml = `<strong>${properties.name}</strong>`;

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
  }, [centerData, tractData]);

  const handleResetButtonClick = () => {
    map.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  // const handlePopupPress = () => {
  //   setButtonPopup(true);
  // };
  // const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return (
    <>
      <div id="map-container" ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
      <button className="reset-button" onClick={handleResetButtonClick}>
        Reset
      </button>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom:{" "}
        {zoom.toFixed(2)}
      </div>
      {selPoint && (
        <div className="sidebar-left">
          <PopupPanel selPoint={selPoint} setSelPoint={setSelPoint}></PopupPanel>
        </div>
      )}
    </>
  );
};

const MapPage = () => {
  // const [isOpen, setOpen] = useState(false);
  // const togglePanel = () => setOpen((prev) => !prev);
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <NavBar></NavBar>
      {/* <CollapsePanel onClick={togglePanel} isOpen={panelOpen} /> */}
      <Map></Map>
      <Footer></Footer>
    </div>
  );
};

export default MapPage;

{
  /* <button className="zoom-in-button" onClick={handlePopupPress}>
        Open popup
      </button> */
}
{
  /* {buttonPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={setButtonPopup(false)} className="close-btn">
              X
            </button>
            Hi!
          </div>
        </div>
      )} */
}
