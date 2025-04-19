import React, { useEffect, useState } from "react";
import "./Users.css";
import Errorbox from "../../Errorbox/Errorbox";
import Modal from "../../Modal/Modal";
import Edit from "../../Modal/Edit";
import Detail from "../../Modal/Detail";
import { AiOutlineDollar } from "react-icons/ai";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [detail, setDetail] = useState({});

  const [userId, setUserId] = useState(null);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newScore, setNewScore] = useState("");
  const [newBuy, setNewBuy] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  };

  const submitDeleteModal = () => {
    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "DELETE",
    }).then((res) => {
      setDeleteModal(false);
      getAllUsers();
    });
  };

  const cancelModal = () => {
    setDeleteModal(false);
    setEditModal(false);
    setDetailModal(false);
  };
  const edituser = () => {
    let newUser = {
      firsname: newFirstName,
      lastname: newLastName,
      username: newUserName,
      password: newPassword,
      phone: newPhone,
      city: newCity,
      email: newEmail,
      address: newAddress,
      score: newScore,
      buy: newBuy,
    };

    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setEditModal(false);
        getAllUsers();
      });
  };

  return (
    <div className="users">
      {allUsers.length ? (
        <div className="users-box">
          <table>
            <thead>
              <tr>
                <th>نام و نام خانوادگی</th>
                <th>نام کاربری</th>
                <th>رمز عبور</th>
                <th>شماره تماس</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firsname} {user.lastname}{" "}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td className="btn-table">
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setUserId(user.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setEditModal(true);
                        setUserId(user.id);
                        setNewFirstName(user.firsname);
                        setNewLastName(user.lastname);
                        setNewUserName(user.username);
                        setNewPassword(user.password);
                        setNewPhone(user.phone);
                        setNewCity(user.city);
                        setNewAddress(user.address);
                        setNewBuy(user.buy);
                        setNewEmail(user.email);
                        setNewScore(user.score);
                      }}
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => {
                        setDetailModal(true);
                        setDetail(user);
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
      ) : (
        <Errorbox masg={"هیچ کاربری یافت نشد"} />
      )}
      {deleteModal && (
        <Modal
          title="آیا از حذف اطمینان دارید؟"
          cancelModal={cancelModal}
          submitModal={submitDeleteModal}
        />
      )}
      {editModal && (
        <Edit clickBody={cancelModal} submitHandler={edituser}>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="نام کاربر را وارد کنید"
              value={newFirstName}
              onChange={(event) => setNewFirstName(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder=" نام خانوادگی کاربر را وارد کنید"
              value={newLastName}
              onChange={(event) => setNewLastName(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="نام کاربری را وارد کنید"
              value={newUserName}
              onChange={(event) => setNewUserName(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="پسورد کاربر را وارد کنید"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="شماره تماس کاربر را وارد کنید"
              value={newPhone}
              onChange={(event) => setNewPhone(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="محل زندگی را وارد کنید"
              value={newCity}
              onChange={(event) => setNewCity(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="ایمیل کاربر را وارد کنید"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="آدرس کاربر را وارد کنید"
              value={newAddress}
              onChange={(event) => setNewAddress(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="امتیاز کاربر در سایت را وارد کنید"
              value={newScore}
              onChange={(event) => setNewScore(event.target.value)}
            />
          </div>
          <div className="modal-input">
            <AiOutlineDollar />
            <input
              type="text"
              placeholder="میران خرید کاربر در سایت را وارد کنید"
              value={newBuy}
              onChange={(event) => setNewBuy(event.target.value)}
            />
          </div>
        </Edit>
      )}
      {detailModal && (
        <Detail clickBody={cancelModal}>
          
            <table>
              <thead >
                <tr>
                  <th>شهر</th>
                  <th>آدرس</th>
                  <th>امتیاز</th>
                  <th>میزان خرید</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td>{detail.city}</td>
                  <td>{detail.address}</td>
                  <td>{detail.score}</td>
                  <td>{detail.buy.toLocaleString()}ریال</td>
                </tr>
              </tbody>
            </table>
        
        </Detail>
      )}
    </div>
  );
}
