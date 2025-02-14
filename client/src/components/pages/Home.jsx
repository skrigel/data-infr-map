import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "../../utilities.css";
import "./Home.css";
import Footer from "../modules/Footer";
import NavBar from "../modules/NavBar";

const Home = () => {
  return (
    <div className="home-Container">
      <ul className="blinking-dots">
        <NavBar></NavBar>
        <div className="home-text">
          <li></li>
          <li></li>
          <h1 className="home-header">Data Center Mapping</h1>
          <li></li>
          <li></li>
          <h2>Explore data centers in Massachusetts!</h2>
          <hr></hr>
          <div className="u-textCenter">
            <Link to="/map" className="u-link">
              Go to map
            </Link>
          </div>

          <Footer />
        </div>
      </ul>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import Card from "../modules/Card";
// import { NewStory } from "../modules/NewPostInput";

// import { get } from "../../utilities";

// const Feed = () => {
//   const [stories, setStories] = useState([]);

//   // called when the "Feed" component "mounts", i.e.
//   // when it shows up on screen
//   useEffect(() => {
//     document.title = "News Feed";
//     get("/api/stories").then((storyObjs) => {
//       let reversedStoryObjs = storyObjs.reverse();
//       setStories(reversedStoryObjs);
//     });
//   }, []);

//   // this gets called when the user pushes "Submit", so their
//   // post gets added to the screen right away
//   const addNewStory = (storyObj) => {
//     setStories([storyObj].concat(stories));
//   };

//   let storiesList = null;
//   const hasStories = stories.length !== 0;
//   if (hasStories) {
//     storiesList = stories.map((storyObj) => (
//       <Card
//         key={`Card_${storyObj._id}`}
//         _id={storyObj._id}
//         creator_name={storyObj.creator_name}
//         content={storyObj.content}
//       />
//     ));
//   } else {
//     storiesList = <div>No stories!</div>;
//   }
//   return (
//     <>
//       <NewStory addNewStory={addNewStory} />
//       {storiesList}
//     </>
//   );
// };

// export default Feed;

// import React, { useState } from "react";

// import "./NewPostInput.css";
// import { post } from "../../utilities";

/**
 * New Post is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop, used for comments
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */
// const NewPostInput = (props) => {
//   const [value, setValue] = useState("");

//   // called whenever the user types in the new post input box
//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   // called when the user hits "Submit" for a new post
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     props.onSubmit && props.onSubmit(value);
//     setValue("");
//   };

//   return (
//     <div className="u-flex">
//       <input
//         type="text"
//         placeholder={props.defaultText}
//         value={value}
//         onChange={handleChange}
//         className="NewPostInput-input"
//       />
//       <button
//         type="submit"
//         className="NewPostInput-button u-pointer"
//         value="Submit"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// /**
//  * New Comment is a New Post component for comments
//  *
//  * Proptypes
//  * @param {string} defaultText is the placeholder text
//  * @param {string} storyId to add comment to
//  */
// const NewComment = (props) => {
//   const addComment = (value) => {
//     const body = { parent: props.storyId, content: value };
//     post("/api/comment", body).then((comment) => {
//       // display this comment on the screen
//       props.addNewComment(comment);
//     });
//   };

//   return <NewPostInput defaultText="New Comment" onSubmit={addComment} />;
// };

// /**
//  * New Story is a New Post component for comments
//  *
//  * Proptypes
//  * @param {string} defaultText is the placeholder text
//  */
// const NewStory = (props) => {
//   const addStory = (value) => {
//     const body = { content: value };
//     post("/api/story", body).then((story) => {
//       // display this story on the screen
//       props.addNewStory(story);
//     });
//   };

//   return <NewPostInput defaultText="New Story" onSubmit={addStory} />;
// };

// export { NewComment, NewStory };
