import "./Header.css";
import { CiBellOn } from "react-icons/ci";
import { BsBrightnessHigh } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

import React, { useEffect, useState } from "react";

export default function Header() {
  const [ darkMode , setDarkMode]= useState(false)
  useEffect(()=>{
    const root = document.documentElement;
    if(darkMode){
      root.classList.add("dark-theme")
    }else{
      root.classList.remove("dark-theme")
    }
  },[darkMode])

  return (
    <div className="header">
      <div className="header-right">
        <img src="./cms-react/Untitled.jpg" alt="" />
        <div>
          <div>ریحانه حسینی</div>
          <div>برنامه نویس فرانت اند</div>
        </div>
      </div>
      <div className="header-left">
        <div className="searchbox">
          <input type="text" placeholder="جست و جو کنید ..." />
          <button className="desktop-size-searchbtn">جست و جو</button>
          <IoSearch className="mobile-size-serachIcon"/>
        </div>
        <div className="header-left-icons">
          <CiBellOn />
        </div>
        <div className="header-left-icons">
          <BsBrightnessHigh style={{cursor:"pointer"}} onClick={()=>{setDarkMode(prev => !prev)}}/>
        </div>
      </div>
    </div>
  );
}
