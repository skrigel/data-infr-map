import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
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
