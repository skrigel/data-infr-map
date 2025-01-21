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
const User = require("./models/user");
const Facilities = require("./models/facilities");
const Tracts = require("./models/tracts");
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
        features: allPoints.map((point) => ({
          type: "Feature",
          properties: {
            name: point.properties.name,
            company: point.properties.company,
            type: point.properties.type,
            address: point.properties.address,
            locality: point.properties.locality,
            county: point.properties.county,
            state: point.properties.state,
            country: point.properties.country,
            zip: point.properties.zip,
          },
          geometry: {
            type: point.geometry.type,
            coordinates: point.geometry.coordinates,
          },
        })),
      };
      res.send(geoJSON);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: "Failed to fetch facilities" });
    });
});

//get census tracts data

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

// app.get('/api/point', (req, res) => {
// write some code to user the coords to find the name and then return the id to
//   Facility.find({name: req.query.name}).then((facilityObj)=>{
//     res.send(facilityObj);
//   })

// });

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
