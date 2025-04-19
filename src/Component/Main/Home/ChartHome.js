import React from "react";
import "./ChartHome.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ChartHome() {
  let chartdata = [
    { "name": "اردیبهشت","sale": 12000 },
    { "name": "خرداد","sale": 10000 },
    { "name": "تیر","sale": 14000 },
    { "name": "مرداد","sale": 12500 },
    { "name": "شهریور","sale": 11500 },
    { "name": "مهر","sale": 10000 },
    { "name": "آبان","sale": 13000 },
  ];
  return (
    <div className="charthome">
      <ResponsiveContainer width="100%" height="100%" aspect={5}>
        <LineChart width={300} height={300} data={chartdata}>
          <Line dataKey="sale" type="monotone" height={300}/>
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey="name" stroke="var(--border)"/>
          <YAxis stroke="var(--border)" tickMargin={50}/>
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
