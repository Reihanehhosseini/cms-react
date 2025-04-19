import React, { useEffect, useState } from "react";
import "./ProductTable.css";
import Modal from "../../Modal/Modal";
import Detail from "../../Modal/Detail";
import { AiOutlineDollar } from "react-icons/ai";
import Edit from "../../Modal/Edit";
import Errorbox from "../../Errorbox/Errorbox";

export default function ProductTable({ allProducts, getAllProducts }) {
  const [deletModal, setDeleteModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [editlModal, setEditModal] = useState(false);

  const [productID, setProductID] = useState(null);
  const [detail, setDetail] = useState({});

  const [newproductTitle, setNewProductTitle] = useState("");
  const [newproductPrice, setNewProductPrice] = useState("");
  const [newproductCount, setNewProductCount] = useState("");
  const [newproductImg, setNewProductImg] = useState("");
  const [newproductPopularity, setNewProductPopularity] = useState("");
  const [newproductSale, setNewProductSale] = useState("");
  const [newproductColors, setNewProductColors] = useState("");

  const submitModal = () => {
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    }).then((res) => {
      setDeleteModal();
      getAllProducts();
    });
  };
  const cancelModal = () => {
    setDeleteModal(false);
  };
  const clickBody = () => {
    setDetailModal(false);
    setEditModal(false);
  };
  console.log(detail);

  const submitHandler = (event) => {
    event.preventDefault();
    let userData = {
      title: newproductTitle,
      price: newproductPrice,
      count: newproductCount,
      img: newproductImg,
      popularity: newproductPopularity,
      sale: newproductSale,
      colors: newproductColors,
    };
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => getAllProducts());
    setEditModal(false);
  };

  return (
    <>
      {allProducts.length ? (
        <div className="product-table-main">
          <div className="product-table">
            <table>
              <thead>
                <tr className="tr-thead">
                  <th>عکس</th>
                  <th>اسم</th>
                  <th>قیمت</th>
                  <th>موجودی</th>
                  <th>شرح</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((product) => (
                  <tr key={product.id} className="tr-tbody">
                    <td>
                      <img src={product.img} alt="" width={90} />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price.toLocaleString()} تومان </td>
                    <td>{product.count}</td>
                    <td className="btn-table">
                      <button
                        onClick={() => {
                          setDeleteModal(true);
                          setProductID(product.id);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        onClick={() => {
                          setEditModal(true);
                          setDetail(product);
                          setNewProductTitle(product.title);
                          setNewProductPrice(product.price);
                          setNewProductCount(product.count);
                          setNewProductImg(product.img);
                          setNewProductPopularity(product.popularity);
                          setNewProductSale(product.sale);
                          setNewProductColors(product.colors);
                          setProductID(product.id);
                        }}
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => {
                          setDetailModal(true);
                          setDetail(product);
                        }}
                      >
                        جزئیات
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Errorbox masg={"هیچ محصولی یافت نشد"} />
      )}
      {deletModal && (
        <Modal
          title="یا از حذف اطمینان دارید؟"
          submitModal={submitModal}
          cancelModal={cancelModal}
        />
      )}
      {detailModal && (
        <Detail clickBody={clickBody}>
          <table>
            <thead className="thead-details">
              <tr>
                <th>محبوبیت</th>
                <th>فروش</th>
                <th>رنگ بندی</th>
              </tr>
            </thead>
            <tbody className="tbody-details">
              <tr>
                <td>{detail.popularity}</td>
                <td>{detail.sale.toLocaleString()}</td>
                <td>{detail.colors}</td>
              </tr>
            </tbody>
          </table>
        </Detail>
      )}
      {editlModal && (
        <Edit submitHandler={submitHandler} clickBody={clickBody}>
          <div className="modal-inputs">
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="عنوان جدید را وارد کنید"
                value={newproductTitle}
                onChange={(event) => {
                  setNewProductTitle(event.target.value);
                }}
              />
            </div>
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="مبلغ جدید را وارد کنید"
                value={newproductPrice}
                onChange={(event) => {
                  setNewProductPrice(event.target.value);
                }}
              />
            </div>
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="موجودی جدید را وارد کنید"
                value={newproductCount}
                onChange={(event) => {
                  setNewProductCount(event.target.value);
                }}
              />
            </div>
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="عکس جدید را وارد کنید"
                value={newproductImg}
                onChange={(event) => {
                  setNewProductImg(event.target.value);
                }}
              />
            </div>
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="میزان محبوبیت جدید را وارد کنید"
                value={newproductPopularity}
                onChange={(event) => {
                  setNewProductPopularity(event.target.value);
                }}
              />
            </div>
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="میزان فروش جدید را وارد کنید"
                value={newproductSale}
                onChange={(event) => {
                  setNewProductSale(event.target.value);
                }}
              />
            </div>
            <div className="modal-input">
              <AiOutlineDollar />
              <input
                type="text"
                placeholder="تعداد رنگ بندی جدید را وارد کنید"
                value={newproductColors}
                onChange={(event) => {
                  setNewProductColors(event.target.value);
                }}
              />
            </div>
          </div>
        </Edit>
      )}
    </>
  );
}
