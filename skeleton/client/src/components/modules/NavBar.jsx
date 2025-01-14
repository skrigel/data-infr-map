import "./NavBar.css";
import { Link } from "react-router-dom";

import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { UserContext } from "../App";

const Login = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      {userId ? (
        <button
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
  return (
    <>
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">DC MAPPER</div>

        <div className="NavBar-linkContainer u-inlineBlock">
          <Link to="/" className="NavBar-link">
            Home
          </Link>
          <Link to="/map" className="NavBar-link">
            Map
          </Link>
          <Link to="/profile" className="NavBar-link">
            Profile
          </Link>
        </div>
      </nav>
      <div className="NavBar-loginContainer">
        <Login></Login>
      </div>
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
