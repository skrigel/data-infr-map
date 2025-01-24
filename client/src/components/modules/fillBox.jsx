import { TextField, Button, Typography, Box } from "@mui/material";
import React, { useState } from "react";

const FillBox = ({ year, setYear, defText }) => {
  const [text, setText] = useState(defText);

  const handleSubmit = () => {
    if (text.length === 4 && !isNaN(text)) {
      setYear(text); // Update the parent state
    }
  };

  return (
    <Box sx={{ padding: 0.5, display: "flex" }}>
      <TextField
        label="Enter a year"
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)} // Update local state
        sx={{ flex: 9 }}
      />
      <Box sx={{ flex: 1, textAlign: "left", marginLeft: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Box sx={{ flex: 1, textAlign: "center" }}>
        {year.length === 4 ? (
          <Typography variant="p">Submitted Year: {year}</Typography>
        ) : (
          <Typography variant="h6" color="error">
            Invalid Year, please try again
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FillBox;
