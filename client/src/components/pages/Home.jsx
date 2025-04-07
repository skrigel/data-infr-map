import React from "react";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Home.css";
import Footer from "../modules/Footer";
import NavBar from "../modules/NavBar";

const Home = () => {
  return (
    <div className="page-wrapper">
      <NavBar />
      <div className="home-content gap-y-20">
        <div className>
        <h1 className="home-title">Data Center Mapping</h1>
        <h2 className="home-subtitle">Explore data centers in Massachusetts!</h2>
        <hr className="home-divider" />
        </div>
        <div className>
        <div className="u-textCenter">
          <Link to="/map" className="home-link">
            Go to map →
          </Link>
        </div>
        </div>
    
      </div>
      <Footer />
    </div>
  );
};

export default Home;
