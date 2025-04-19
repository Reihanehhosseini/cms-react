import React from "react";
import "./Home.css";
import HomeDataBox from "./HomeDataBox";
import ChartHome from "./ChartHome";


export default function Home() {
  return (
    <div className="home">
      <h1 className="home-title">داشبورد مدیریت فروشگاه</h1>
      <HomeDataBox />
      <ChartHome />
    </div>
  );
}
