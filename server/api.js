/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const Place = require("./models/places");
const Subdivision = require("./models/county_subdivisions");
const BlockGroup = require("./models/block_groups");
const Network = require("./models/networks");

const User = require("./models/user");
const Facilities = require("./models/facilities");
const Tracts = require("./models/tracts");
const Counties = require("./models/counties");
require("dotenv").config();
// const Facility = require("./models/facility");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/user", (req, res) => {
  User.findById(req.query.userid)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send("User Not");
    });
});

// API endpoint to fetch facilities data

router.get("/facilities", (req, res) => {
  Facilities.find({})
    .then((allPoints) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const geoJSON = {
        type: "FeatureCollection",
        features: allPoints.map((point) => {
          // Extract properties while conditionally checking for network
          const properties = {
            name: point.properties.name,
            company: point.properties.company,
            type: point.properties.type,
            address: point.properties.address,
            locality: point.properties.locality,
            county: point.properties.county,
            state: point.properties.state,
            country: point.properties.country,
            zip: point.properties.zip,
            net_count: point.properties.net_count,
            management: point.properties.management,
          };

          // Add network if it exists
          if (point.properties.networks) {
            const nets = point.properties.networks;

            properties.networks = nets;
          } else {
            properties.networks = [];
          }

          // if (point.properties.management) {
          //   properties.management = point.properties.management;
          // } else {
          //   properties.management = point.properties.company[0];
          // }

          return {
            type: "Feature",
            properties: properties,
            geometry: {
              type: point.geometry.type,
              coordinates: point.geometry.coordinates,
            },
          };
        }),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch facilities" });
    });
});

router.get("/networks", (req, res) => {
  Network.find({})
    .then((allNets) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const netObj = allNets.map((net) => {
        return {
          name: net.name,
          net_id: net.net_id,
          fac_count: net.fac_id,
          facilities: net.facilities,
          info_ratio: net.info_ratio,
          info_scope: net.info_scope,
          info_traffic: net.info_traffic,
          info_type: net.info_type,
          ix_count: net.ix_count,
          notes: net.notes,
          org_id: net.org.id,
          org_name: net.org.id,
          org_website: net.org.website,
          org_notes: net.org.notes,
          org_net_set: net.org.net_set,
          org_fac_set: net.org.fac_set,
          org_ix_set: net.org.ix_set,
          address: net.org.address1,
          city: net.org.city,
          state: net.org.state,
          zip: net.org.zipcode,
          coords: [net.org.longitude, net.org.latitude],
        };
      });
      res.send(netObj);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch facilities" });
    });
});

//get census tracts data
// PeeringDB API Proxy Route
// router.get("/peeringdb/facility/:facId", async (req, res) => {
//   const { facId } = req.params;
//   const apiKey = "your_api_key_here"; // Keep this key private on the backend
//   const peeringDBUrl = `https://peeringdb.com/api/net/fac_id=${facId}`;

//   try {
//     const response = await fetch(peeringDBUrl, {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       return res.status(response.status).send(response.statusText);
//     }

//     const data = await response.json();
//     res.json(data); // Send the fetched data to the client
//   } catch (error) {
//     console.error("Error fetching PeeringDB data:", error);
//     res.status(500).send("Failed to fetch data");
//   }
// });

router.get("/census_tracts", (req, res) => {
  Tracts.find({})
    .then((allPoly) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const geoJSON = {
        type: "FeatureCollection",
        features: allPoly.map((poly) => ({
          type: "Feature",
          properties: {
            GEOID: poly.properties.GEOID,
            NAME: poly.properties.NAMELSAD,
            ALAND: poly.properties.ALAND,
            AWATER: poly.properties.AWATER,
            CENSIS_TRACT: poly.properties.CENSUS_TRACT,
            COUNTY: poly.properties.COUNTY_ID,
          },
          geometry: {
            type: poly.geometry.type,
            coordinates: poly.geometry.coordinates,
          },
        })),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch tracts" });
    });
});

router.get("/census_counties", (req, res) => {
  Counties.find({})
    .then((allPoly) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const geoJSON = {
        type: "FeatureCollection",
        features: allPoly.map((poly) => ({
          type: "Feature",
          properties: {
            COUNTYNS: poly.properties.COUNTYNS,
            GEOID: poly.properties.GEOID,
            GEOIDFQ: poly.properties.GEOIDFQ,
            NAME: poly.properties.NAMELSAD,
            COUNTY: poly.properties.NAMELSAD,
            CLASSFP: poly.properties.CLASSFP,
            FUNCSTAT: poly.properties.FUNCSTAT,
            ALAND: poly.properties.ALAND,
            // AWATER: poly.properties.AWATER,
          },
          geometry: {
            type: poly.geometry.type,
            coordinates: poly.geometry.coordinates,
          },
        })),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch tracts" });
    });
});

router.get("/census_county_subdivisions", (req, res) => {
  Subdivision.find({})
    .then((allPoly) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const geoJSON = {
        type: "FeatureCollection",
        features: allPoly.map((poly) => ({
          type: "Feature",
          properties: {
            GEOID: poly.properties.GEOID,
            GEOIDFQ: poly.properties.GEOIDFQ,
            NAME: poly.properties.NAMELSAD,
            CLASSFP: poly.properties.CLASSFP,
            FUNCSTAT: poly.properties.FUNCSTAT,
            AWATER: poly.properties.AWATER,
            ALAND: poly.properties.ALAND,
            COUNTY: poly.properties.COUNTY_ID,

            // AWATER: poly.properties.AWATER,
          },
          geometry: {
            type: poly.geometry.type,
            coordinates: poly.geometry.coordinates,
          },
        })),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch county subdivisions" });
    });
});

router.get("/census_places", (req, res) => {
  Place.find({})
    .then((allPoly) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const geoJSON = {
        type: "FeatureCollection",
        features: allPoly.map((poly) => ({
          type: "Feature",
          properties: {
            GEOID: poly.properties.GEOID,
            GEOIDFQ: poly.properties.GEOIDFQ,
            NAME: poly.properties.NAMELSAD,
            COUNTY: poly.properties.COUNTY_ID,
            CLASSFP: poly.properties.CLASSFP,
            FUNCSTAT: poly.properties.FUNCSTAT,
            ALAND: poly.properties.ALAND,
            AWATER: poly.properties.AWATER,
          },
          geometry: {
            type: poly.geometry.type,
            coordinates: poly.geometry.coordinates,
          },
        })),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch tracts" });
    });
});

router.get("/census_block_groups", (req, res) => {
  BlockGroup.find({})
    .then((allPoly) => {
      // Map the data to a GeoJSON FeatureCollection
      // console.log(allPoints[0]);
      const geoJSON = {
        type: "FeatureCollection",
        features: allPoly.map((poly) => ({
          type: "Feature",
          properties: {
            GEOID: poly.properties.GEOID,
            GEOIDFQ: poly.properties.GEOIDFQ,
            NAME: poly.properties.NAMELSAD,
            AWATER: poly.properties.AWATER,
            ALAND: poly.properties.ALAND,
            BLOCK: poly.properties.BLOCK,
            COUNTY: poly.properties.COUNTY_ID,

            // AWATER: poly.properties.AWATER,
          },
          geometry: {
            type: poly.geometry.type,
            coordinates: poly.geometry.coordinates,
          },
        })),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch county subdivisions" });
    });
});
// router.get("/api/census_data", (req, res) => {
//   const { year, survey, variables, countyFIPS, stateFIPS } = req.query;
//   const apiKey = process.env.CENSUS_API_KEY;

//   // Validate required parameters
//   if (!year || !survey || !variables || !countyFIPS || !stateFIPS) {
//     return res.status(400).json({ error: "Missing one or more required parameters." });
//   }

//   // Construct the Census API URL
//   const apiUrl = `https://api.census.gov/data/${year}/${survey}?get=NAME,${variables}&for=county:${countyFIPS}&in=state:${stateFIPS}&key=${apiKey}`;

//   fetch(apiUrl)
//     .then((response) => response.json()) // Resolve JSON
//     .then((data) => res.json(data)) // Send the resolved data to the frontend
//     .catch((error) => {
//       res.status(500).json({ error: `Failed to fetch data from Census API: ${error.message}` });
//     });
// });

// const queryByCounty = () => {
//     const matchingObjects = tractData.features.filter((obj) => obj.properties.COUNTY === region);

//     const variables = demoTypeToFields[demoType];
//     const variableNames = variables.join(",");

//     const [stateFIPS, countyFIPS] = craftCensusAPIQuery(matchingObjects[0], variableNames);

//     const params = {
//       year: year,
//       survey: survey,
//       variables: variableNames,
//       countyFIPS: countyFIPS,
//       stateFIPS: stateFIPS,
//     };
//     // Extract relevant variables for matching objects
//     get_external(`api/census_data`, params).then((apiData) => {
//       console.log("api data", apiData);
//       setDemoData(apiData);
//       console.log("demo", demoData);
//     });

// router.post("/user", auth.ensureLoggedIn, (req, res) => {
//   console.log(`Received a chat message from ${req.user.name}: ${req.body.content}`);

//   // insert this message into the database
//   const user = new User({
//     name: req.body.name,
//   });
//   user.save();
// });

// const CENSUS_API_KEY = "YOUR_CENSUS_API_KEY"; // Replace with your Census API key

// Route to fetch census data
// router.get("/census-data", (req, res) => {
//   const endpoint = "https://api.census.gov/data/2020/acs/acs5";
//   const params = {
//     get: "B01003_001E,NAME",
//     for: "tract:*",
//     in: "state:*",
//     key: process.env.CENSUS_API_KEY, // Use your environment variable for the API key
//   };

//   get(endpoint, params)
//     .then((data) => {
//       res.send(data); // Send the fetched data to the client
//     })
//     .catch((error) => {
//       console.error("Error fetching Census data:", error);
//       res.status(500).json({ error: "Failed to fetch Census data" }); // Send an error response
//     });
// });

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
