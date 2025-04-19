import React, { Children, useEffect } from "react";
import "./Detail.css";
import "./Modal.css";
import ReactDOM from "react-dom";

export default function Detail({ clickBody , children}) {

  useEffect(() => {
    const KeypressHandler = (event) => {
      if (event.keyCode === 27) {
        clickBody();
      }
    };
    window.addEventListener("keydown", KeypressHandler);
    return ()=> window.removeEventListener("keydown", KeypressHandler)
  });

  return ReactDOM.createPortal(
    <div className="modal-section" onClick={clickBody}>
      <div className="users-box-detail">
          {children}
      </div>
    </div>,
    document.getElementById("modals-section")
  );
}
