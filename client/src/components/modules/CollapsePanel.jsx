import React, { useState, useEffect, useRef } from "react";
import FillBox from "./fillBox";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/fontawesome-free-solid";
import "./CollapsePanel.css";
import "../../utilities.css";

const CollapsePanel = ({ isOpen, setFunc, year, setYear }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const handleYearSubmit = (inpYear) => {
    setYear(inpYear);
  };

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
            <div className={"collapsible-content-padding-edonec"}>
              <FillBox year={year} setYear={handleYearSubmit} defText={""}></FillBox>
            </div>
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
