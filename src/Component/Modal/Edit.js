import React, { Children, useEffect } from "react";
import "./Edit.css";
import ReactDOM from "react-dom";
import "./Modal.css";

export default function Edit({ children, submitHandler, clickBody }) {

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
    <div className="modal-section">
      <div className="modal modal-edit">
        <h1>اطلاعات جدید را وارد کنید</h1>
        {children}
        <button className="edit-btn" onClick={submitHandler}>
          ثبت اطلاعات جدید
        </button>
      </div>
    </div>,
    document.getElementById("modals-section")
  );
}
