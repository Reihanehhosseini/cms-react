import React from "react";
import "./Aside.css";
import { TiHomeOutline } from "react-icons/ti";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TfiCommentAlt } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function Aside() {
  return (
    <div className="Aside">
      <div className="aside-dash">به داشبورد خود خوش آمدید</div>
      <ul className="aside-list">
        <li>
          <NavLink to="./Home" className={(active) => active.isActive ? "active" : ""}>
            <TiHomeOutline />
            صفحه اصلی
          </NavLink>
        </li>
        <li>
          <NavLink to="./Products">
            <MdOutlineProductionQuantityLimits />
            محصولات
          </NavLink>
        </li>
        <li>
          <NavLink to="./Comments">
            <TfiCommentAlt />
            کامنت ها
          </NavLink>
        </li>
        <li>
          <NavLink to="./Users">
            <LuUsers />
            کاربران
          </NavLink>
        </li>
        <li>
          <NavLink to="./Orders">
            <IoBagCheckOutline />
            سفارشات
          </NavLink>
        </li>
        <li>
          <NavLink to="./Sales">
            <BsCurrencyDollar />
            تخفیف ها
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
