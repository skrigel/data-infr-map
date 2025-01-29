import "./MapPage.css";
import NavBar from "../modules/NavBar";
import Footer from "../modules/Footer";
import { ExternalLink } from "react-external-link";
import {
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Link,
  IconButton,
} from "@mui/material";
import CensusDataTable from "../modules/CensusDataTable";
import React, { Component, useRef, useEffect, useState } from "react";
import CollapsePanel from "../modules/CollapsePanel";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import FillBox from "../modules/fillBox";
import { get, post, get_external } from "../../utilities";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PopupPanel from "../modules/PopupPanel";
import PopupButtons from "../modules/PopupButtons";
import { MapContext } from "react-map-gl/dist/esm/components/map";
import MapLegend from "../modules/MapLegend";
// import { use } from "../../../../server/api";

const INITIAL_CENTER = [-71.057083, 42.361145];
const INITIAL_ZOOM = 10.12;

const MAP_BOUNDS = new mapboxgl.LngLatBounds(
  new mapboxgl.LngLat(-74.3099, 40.9944),
  new mapboxgl.LngLat(-70.2739, 42.9)
);
const CENSUS_API_KEY = "af2cf73162a5d8a466c8918ebfc397716c84093c";

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

//Please ignore that I put this here and not in .env --> I'm sorry
mapboxgl.accessToken =
  "pk.eyJ1Ijoic2tyaWdlbCIsImEiOiJjbTVzdnNkZnQwcmd1Mmxwd2Q4czcxN2h3In0.eEbeS03iSXZwe-_3bzi8Vg";

const Map = () => {
  const mapContainer = useRef(null);
  // const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const map = useRef(null);

  //for updating type of data from census API
  const [demoType, setDemoType] = useState("education");

  const [demoPanelOpen, setDemoPanelOpen] = useState(false);
  const [demoData, setDemoData] = useState(null);
  const [region, setRegion] = useState(null);
  const [year, setYear] = useState("2023");

  //TODO: allow users to go from block-->tract-->county-->state level
  const [level, setLevel] = useState("places");
  const [levelData, setLevelData] = useState(null);

  const [centerData, setCenterData] = useState(null);
  const [isCollOpen, setCollOpen] = useState(true);
  const [selPoint, setSelPoint] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [currNetId, setCurrNetId] = useState(null);
  const [netFacLayer, setNetFacLayer] = useState([]);

  // useEffect(() => {

  //   const extractNetworksbyFac = () => {
  //     if (selPoint && currNet) {
  //       get(`/api/networks`, {net_id: currNet.net_id}).then((netObj) => setCurrNet(netObj));
  //     }

  //   };

  // }, [currNet])

  //extracts networks objects for the selected facility
  useEffect(() => {
    const fetchNetworks = async () => {
      if (selPoint) {
        const networkIds = selPoint.networks || [];

        if (networkIds.length > 0) {
          try {
            // Fetch all networks first
            const allNetworks = await get(`/api/networks`);

            // Filter networks to match only the selected point's network IDs
            const networkData = allNetworks.filter((network) =>
              networkIds.includes(network.net_id)
            );
            console.log("Filtered Networks:", networkData);
            if (networkData) {
              setNetworks(networkData);
            }
          } catch (error) {
            console.error("Error fetching networks:", error);
          }
        }
      }
    };

    fetchNetworks();

    // const fetchNetworks = async () => {
    //   if (selPoint) {

    //     const networkIds = selPoint.networks || [];

    //     if (networkIds) {
    //       const networkData = await Promise.all(
    //         networkIds.map((netId) => get(`/api/networks`).filter(network =>
    //           networkIds.includes(network.net_id)))
    //       );
    //       setNetworks(networkData);
    //       console.log("networks", networks);
    //     }
    //     console.log("networkId", networkIds);
    //   }
    // };
    // setTimeout(3);
    // fetchNetworks();
  }, [selPoint]);

  //handle Net selection:

  const handleNetworkSelect = (network_id) => {
    const selectedFacilities = centerData.features.filter((facility) => {
      return facility.properties.networks.includes(network_id);
    });

    const lineFeatures = selectedFacilities
      .map((facility, index, filteredFacilities) => {
        if (index === 0) return null; // Skip the first facility since it has no previous facility to connect to

        return {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              filteredFacilities[index - 1].geometry.coordinates,
              facility.geometry.coordinates,
            ],
          },
          properties: { net_id: network_id },
        };
      })
      .filter(Boolean); // Remove null values from the array

    // Create a new layer for the lines
    const lineLayer = {
      type: "FeatureCollection",
      features: lineFeatures,
    };

    console.log("lineLayer", lineLayer);

    // Update the state with the new layer
    setNetFacLayer(lineLayer);
  };

  //on selection of network, find facilities to connect
  //first, find the ids
  useEffect(() => {
    if (currNetId && centerData) {
      handleNetworkSelect(currNetId);
    }
  }, [currNetId]);

  useEffect(() => {
    setCurrNetId(null);
    setNetworks(null);
    setNetFacLayer(null);
  }, [selPoint]);

  //TODO allow filtering by level i.e. state --> county --> city --> block, etc.

  useEffect(() => {
    get(`/api/facilities`).then((pointsObj) => setCenterData(pointsObj));
  }, []);

  useEffect(() => {
    get(`/api/census_${level}`).then((pointsObj) => setLevelData(pointsObj));
  }, [level]);

  function standardizeNetCount(features) {
    // Extract net_count values
    const counts = features.map((feature) => {
      const netCount = feature.properties.net_count || 0; // Handle null or undefined
      return netCount;
    });
    // Normalize the counts
    const min = Math.min(...counts);
    const max = Math.max(...counts);

    features.forEach((feature, index) => {
      const rawCount = counts[index];
      feature.properties.normalized_net_count = max === min ? 0 : (rawCount - min) / (max - min);
    });

    return features;
  }

  // Add the GeoJSON to Mapbox
  function addFacilitiesLayer(map, geoJSON) {
    const standardizedFeatures = standardizeNetCount(geoJSON.features);
    const standardizedGeoJSON = { ...geoJSON, features: standardizedFeatures };
    map.addSource("facilities", {
      type: "geojson",
      data: standardizedGeoJSON,
    });

    // Add a circle layer
    map.addLayer({
      id: "circle",
      type: "circle",
      source: "facilities",
      paint: {
        // Scale circle radius with normalized_net_count
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["get", "normalized_net_count"],
          0,
          10, // Minimum size
          1,
          50, // Maximum size
        ],
        "circle-color": "#007cbf", // Circle color
        "circle-opacity": 0.6, // Circle transparency
      },
    });
  }

  const [center, setCenter] = useState(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard", // Mapbox style URL
      center: center,
      zoom: zoom,
      maxBounds: MAP_BOUNDS,
    });

    map.current.on("load", () => {
      // console.log(levelData["features"][0]);
      if (centerData && levelData) {
        addFacilitiesLayer(map.current, centerData);
        // map.current.addSource("points", {
        //   type: "geojson",
        //   data: centerData,
        // });

        console.log("level", levelData["features"][0].properties);

        map.current.addSource("geosections", {
          type: "geojson",
          data: levelData,
        });

        map.current.addLayer({
          id: "geosection_fill",
          type: "fill",
          source: "geosections",
          layout: {},
          paint: {
            "fill-color": "#0080ff",
            "fill-opacity": 0,
          },
        });

        map.current.addLayer({
          id: "geosection_outline",
          type: "line",
          source: "geosections",
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 0.5,
          },
        });

        if (netFacLayer) {
          map.current.addSource("netfac", {
            type: "geojson",
            data: netFacLayer,
          });

          map.current.addLayer({
            id: "netfac_line",
            type: "line",
            source: "netfac",
            layout: {},
            paint: {
              "fill-color": "#0080ff",
              "fill-opacity": 0,
            },
          });
        }
        // map.current.addLayer({
        //   id: "circle",
        //   type: "circle",
        //   source: "points",
        //   paint: {
        //     "circle-color": "#4264fb",
        //     "circle-radius": 8,
        //     "circle-stroke-width": 3,
        //     "circle-stroke-color": "#ffffff",
        //   },
        // });
      }

      // map.current.querySourceFeatures("facilities", {filter: ['in', 'COUNTY', selPoint.properties.COUNTY]})
      //TODO: prevent users from searching outside of massachusetts
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
        console.log("right before setting", e.features[0].properties);
        e.features[0].properties.networks = JSON.parse(e.features[0].properties.networks);
        setSelPoint(e.features[0].properties);
      });

      map.current.on("click", "geosection_fill", (e) => {
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
  }, [centerData, levelData, netFacLayer]);

  const handleResetButtonClick = () => {
    map.current.flyTo({
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });
  };

  return (
    <>
      <CollapsePanel
        isOpen={isCollOpen}
        setFunc={setCollOpen}
        networks={networks}
        level={level}
        setLevel={setLevel}
      ></CollapsePanel>

      {/* {networks && (
        <TableContainer className="w-2xl h-100%">
          <TableHead>
            <TableRow>
              <TableCell>Network ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Network Traffic</TableCell>
              <TableCell>Website</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {networks.map((network) => (
              <TableRow
                key={network.net_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {network.net_id}
                </TableCell>
                <TableCell align="right">{network.name}</TableCell>
                <TableCell align="right">
                  {network.info_traffic ? network.info_traffic : "N/A"}
                </TableCell>
                <TableCell align="right">
                  <Button>
                    <a href={network.org_website} target="_blank">
                      Website
                    </a>
                  </Button>

                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleNetworkSelect(network.net_id)}>
                    Connect Facilities
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
      )} */}

      <div id="map-container" ref={mapContainer} style={{ width: "100%", height: "100vh" }}>
        <button className="reset-button" onClick={handleResetButtonClick}>
          Reset
        </button>
        <div className="sidebar">
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom:{" "}
          {zoom.toFixed(2)}
        </div>

        {/* <div className="panel-container"> */}

        {selPoint && (
          <Container>
            <PopupPanel
              selPoint={selPoint}
              setSelPoint={setSelPoint}
              setDemoPanelOpen={setCollOpen}
            />
          </Container>
        )}
      </div>
    </>
  );
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
