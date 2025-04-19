import { useState } from "react";
import React from "react";
import "./Addproducts.css";

export default function Addproducts({ getAllProducts }) {
  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopularity, setProductNewPopularity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColors, setProductNewColors] = useState("");

  let newProductsInfos = {
    title: productNewTitle,
    price: productNewPrice,
    count: productNewCount,
    img: productNewImg,
    popularity: productNewPopularity,
    sale: productNewSale,
    colors: productNewColors,
  };

  const addProductHandler = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductsInfos),
    })
      .then((res) => {
        getAllProducts();
        emptyInputs();
      }
      )
  };
  function emptyInputs () {
    setProductNewTitle("");
    setProductNewPrice("");
    setProductNewCount("");
    setProductNewImg("");
    setProductNewPopularity("");
    setProductNewSale("");
    setProductNewColors("");
  };

  return (
    <div className="addproduct">
      <h1>افزودن محصول جدید</h1>
      <form action="#">
        <div className="addproduct-form">
          <div className="form-section">
            <input
              type="text"
              placeholder="اسم محصول را بنویسید"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="قیمت محصول را بنویسید"
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="موجودی محصول را بنویسید"
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="آدرس عکس محصول را بنویسید"
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              value={productNewPopularity}
              onChange={(event) => setProductNewPopularity(event.target.value)}
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="میزان فروش محصول را بنویسید"
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
            />
          </div>
          <div className="form-section">
            <input
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              value={productNewColors}
              onChange={(event) => setProductNewColors(event.target.value)}
            />
          </div>
        </div>
        <button className="addproduct-btn" onClick={addProductHandler}>
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
