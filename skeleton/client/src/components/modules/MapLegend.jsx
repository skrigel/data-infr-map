const MapLegend = (props) => {
  // start with by level
  const level = props.level;
  const setLevel = props.setLevelData; //... etc
  //try this later
  const subset = props.subset; //can be none --> show all

  switch (level) {
    case "tracts":
      return;
    // case value2:
    //   // code block 2
    //   break;
    // ...
    default:
      return (
        <>
          <button>Click me! I do nothing!!</button>
        </>
      );
    // code block to be executed if none of the cases match
  }
  //TODO: buttons displayed row-wise (use flex )
  // button: name
  // button2: namew
};

export default MapLegend;
