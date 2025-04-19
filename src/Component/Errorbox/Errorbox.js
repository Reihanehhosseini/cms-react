import React from "react";
import "./Errorbox.css";

export default function Errorbox({ masg }) {
  return (
    <div className="errorbox">
      <h1>{masg}</h1>
    </div>
  );
}
