import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

export default function Modal({cancelModal , submitModal , title }) {
  

  return ReactDOM.createPortal(
    <div className="modal-section">
      <div className="modal">
        <h1>{title}</h1>
        <div>
          <button className="modal-btn" onClick={submitModal}>بله</button>
          <button className="modal-btn" onClick={cancelModal}>خیر</button>
        </div>
      </div>
    </div>, document.getElementById('modals-section')
  );
}
