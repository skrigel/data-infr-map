import React, { useState } from "react";

const TablePanel = (props) => {
  const callField = props.field;
  const facData = props.facData;

  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    get(`/api/${callField}`).then((pointsObj) => setCenterData(pointsObj));
  }, []);

  return (
    <>
      <button onClick={onClose} className="close-button">
        Close
      </button>
      <h3>{selectedRegion} - Demographic Data</h3>
      {/* Display demographic data */}
      <button onClick={handleViewMoreClick} className="view-more-button">
        View More Info
      </button>
    </>
  );
};

export default TablePanel;
