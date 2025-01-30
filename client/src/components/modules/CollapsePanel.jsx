import React, { useState, useEffect, useRef } from "react";
import MapLegend from "./MapLegend";
import FillBox from "./fillBox";
import {
  Button,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Link,
  IconButton,
} from "@mui/material";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/fontawesome-free-solid";
import "./CollapsePanel.css";
import "../../utilities.css";

const CollapsePanel = ({ isOpen, setFunc, networks, handleNetworkSelect, level, setLevel }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const handleLevelClick = (newLevel) => {
    setLevel(newLevel);
  };

  // const handleYearSubmit = (inpYear) => {
  //   setYear(inpYear);
  // };

  const handleCollButton = () => {
    setFunc(!isOpen);
  };

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return;
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height);
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);

  useEffect(() => {
    if (isOpen) setHeight(ref.current.getBoundingClientRect().height);
    else setHeight(0);
  }, [isOpen]);

  return (
    <>
      <div className={"collapsible-card-edonec"}>
        <div>
          <div className={"collapsible-header-edonec"}>
            <div className={"title-text-edonec"}>Apply Additional Filters:</div>
            <button
              type="button"
              className={"collapsible-icon-button-edonec"}
              onClick={handleCollButton}
            >
              {isOpen ? (
                <div className="rotate-center-edonec down">/\</div>
              ) : (
                <div className="rotate-center-edonec down">\/</div>
              )}
            </button>
          </div>
        </div>
        <div className={"collapsible-content-edonec"} style={{ height }}>
          <div ref={ref}>
            <div className={"collapsible-content-padding-edonec-sm"}>
              <MapLegend level={level} setLevel={handleLevelClick}></MapLegend>
            </div>
            {networks && (
              <TableContainer className="w-2xl h-100%">
                <TableHead>
                  <TableRow>
                    <TableCell>Network ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Network Traffic</TableCell>
                    <TableCell>Website</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {networks.map((network) => (
                    <TableRow
                      key={network.net_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {network.net_id}
                      </TableCell>
                      <TableCell align="right">{network.name}</TableCell>
                      <TableCell align="right">
                        {network.info_traffic ? network.info_traffic : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        <Button>
                          <a href={network.org_website} target="_blank">
                            Website
                          </a>
                        </Button>
                        {/* <Button className="in-hover:bg-gray-500" href={network.website}>
                    Website
                  </Button> */}
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={() => handleNetworkSelect(network.net_id)}>
                          Connect Facilities
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {/* <div className={"collapsible-content-padding-edonec"}>
              <FillBox year={year} setYear={handleYearSubmit} defText={""}></FillBox>
            </div> */}
          </div>
        </div>
      </div>
    </>

    // <>

    //   <div className="card">
    //     <div>
    //       <div className="d-flex justify-content-between">
    //         <h6 className="font-weight-bold">{title}</h6>
    //         <button type="button" className="med-btn" onClick={onClick}>
    //           {!isOpen ? <div>Close</div> : <div>Open</div>}
    //         </button>
    //       </div>
    //     </div>

    //     <div className="border-bottom">
    //       <div>{isOpen && <div>-----</div>}</div>
    //     </div>
    //   </div>
    // </>
  );
};

export default CollapsePanel;
