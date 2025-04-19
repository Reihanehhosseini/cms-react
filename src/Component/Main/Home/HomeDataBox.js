import React, { useEffect, useState } from "react";
import "./HomeDataBox.css";

export default function HomeDataBox() {
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders , setOrders] = useState([])


  useEffect(() => {
    getProduct();
    getUsers()
    getOrders()
  }, []);
  const getProduct = () => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((product) => setProduct(product));
  };
  const getUsers = ()=>{
    fetch("http://localhost:8000/api/users")
    .then(res=>res.json())
    .then(user => setUsers(user))
  }
  const getOrders = ()=>{
    fetch("http://localhost:8000/api/orders")
    .then(res => res.json())
    .then(order => setOrders(order))
  }

  return (
    <div className="HomeDataBox">
      <div className="home-box" style={{ backgroundColor: "rgb(212 93 93 / 82%)"}}>
        <span>درآمد امروز</span>
        <span>0</span>
      </div>
      <div className="home-box" style={{ backgroundColor: "#e75724" }}>
        <span>محصولات موجود</span>
        <span>{product.length}</span>
      </div>
      <div className="home-box" style={{ backgroundColor: "#3b3b3b" }}>
        <span>کاربران فعال</span>
        <span>{users.length}</span>
      </div>
      <div className="home-box" style={{ backgroundColor: "#471aaa" }}>
        <span>تعداد سفارشات</span>
        <span>{orders.length}</span>
      </div>
    </div>
  );
}
