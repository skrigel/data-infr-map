import "./NavBar.css";

import { Link } from "react-router-dom";

import React, { useContext, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { UserContext } from "../App";
// import Sidebar from "./Sidebar";
// import { IconButton, Box } from "@mui/material";

const Login = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <button
          className="medium-btn"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
      )}
    </>
  );
};

const NavBar = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <>
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">DC MAPPER</div>

        <div className="NavBar-linkContainer u-text-Center">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          <Link to="/map" className="NavBar-link">
            Map
          </Link>
          {userId && (
            <Link to={`/profile`} className="NavBar-link u-inlineBlock">
              Profile
            </Link>
          )}
        </div>
        <Login className="NavBar-loginContainer"></Login>
      </nav>
    </>
  );
};

export default NavBar;

// const NavBar = () => {
//   return (
//     <nav className="Header-container">
//       <div className="Header-title">Welcome!</div>
//     </nav>
//   );
// };

// export default NavBar;
