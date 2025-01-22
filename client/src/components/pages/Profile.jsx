import React, { useEffect, useState, useParams, useContext } from "react";

import NavBar from "../modules/NavBar";
import "../../utilities.css";
import "./Profile.css";
import { UserContext } from "../App";
import { get, post } from "../../utilities";
import profileImg from "../../assets/person.png";
// import { UserContext, useParams } from "../App";

const Profile = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  // const { userId, handleLogin, handleLogout } = useContext(UserContext);

  useEffect(() => {
    document.title = "Profile Page";
  }, []);

  const userid = userId;
  //init to null
  const [user, setUser] = useState(null);

  useEffect(() => {
    get(`/api/user`, { userid: userid }).then((userObj) => setUser(userObj));
  }, []);

  // useEffect(() => {
  //   get("api/user", { userid: userid }).then((user) => {
  //     setUser(user);
  //   });
  // });

  return (
    <>
      <NavBar></NavBar>
      <div className="Profile-avatarContainer">
        <img src={profileImg} className="Profile-avatar" alt="Profile img" />
      </div>
      {!user ? <div>Loading!</div> : <h1 className="Profile-name u-textCenter">{user.name}</h1>}
      <hr className="Profile-line" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">To fill</div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Once again, to fill :o</h4>
          {/* <div id="favorite-cat">corgi</div> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
