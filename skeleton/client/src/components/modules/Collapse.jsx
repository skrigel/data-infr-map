import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/fontawesome-free-solid";
import "./Collapse.css";
import "../../utilities.css";

const Collapsible = ({ isOpen, onClick, title }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

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
            <div className={"title-text-edonec"}>Header</div>
            <button type="button" className={"collapsible-icon-button-edonec"} onClick={onClick}>
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
            <div className={"collapsible-content-padding-edonec"}>{title}</div>
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

export default Collapsible;
