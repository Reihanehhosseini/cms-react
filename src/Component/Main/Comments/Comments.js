import React, { useEffect, useState } from "react";
import "./Comments.css";
import Errorbox from "../../Errorbox/Errorbox";
import Detail from "../../Modal/Detail";
import Modal from "../../Modal/Modal";
import Edit from "../../Modal/Edit";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [detail, setdetail] = useState(null);
  const [commentId, setCommentId] = useState(null);

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
      .then((Comments) => setAllComments(Comments));
  };

  const rejectHandler = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => {
        setRejectModal(false);
        getAllComments();
      });
  };

  const submitcomment = (comment) => {
    setDetailModal(true);
    setdetail(comment);
  };
  const clickBody = () => {
    setDetailModal(false);
    setEditModal(false);
  };

  const cancelModal = () => {
    setDeleteModal(false);
  };
  const submitModal = () => {
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "DELETE",
    }).then((res) => {
      setDeleteModal(false);
      getAllComments();
    });
  };
  const submitHandler = () => {
    const newBody = {
      body: edit,
    };
    fetch(`http://localhost:8000/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    }).then((res) => {
      getAllComments();
      setEditModal(false);
    });
  };
  const acceptModalHandler = () => {
    setAcceptModal(false);
    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => getAllComments());
  };
  const cancelModalHandler = () => {
    setAcceptModal(false);
    setRejectModal(false);
  };

  return (
    <div className="comments">
      {allComments.length ? (
        <div className="comment-box">
          <table>
            <thead className="btn-thead">
              <tr>
                <th>اسم کاربر</th>
                <th>محصول </th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
              </tr>
            </thead>
            <tbody>
              {allComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID} </td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      className="btn-button"
                      onClick={() => submitcomment(comment)}
                    >
                      دیدن متن
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td className="btn-table">
                    <button
                      onClick={() => {
                        setDeleteModal(true);
                        setCommentId(comment.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setEditModal(true);
                        setEdit(comment.body);
                        setCommentId(comment.id);
                      }}
                    >
                      ویرایش
                    </button>
                    <button>پاسخ</button>
                    {comment.isAccept === 0 ? (
                      <button
                        onClick={() => {
                          setAcceptModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setRejectModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        رد کامنت
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Errorbox masg={"هیچ کامنتی یافت نشد"} />
      )}
      {detailModal && (
        <Detail clickBody={clickBody}>
          <table>
            <thead className="thead-details">
              <tr>
                <th>متن</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tbody-details">
              <tr>
                <td>{detail.body}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Detail>
      )}
      {deleteModal && (
        <Modal
          title="یا از حذف اطمینان دارید؟"
          submitModal={submitModal}
          cancelModal={cancelModal}
        />
      )}
      {editModal && (
        <Edit submitHandler={submitHandler} clickBody={clickBody}>
          <textarea
            name=""
            id=""
            value={edit}
            onChange={(event) => {
              setEdit(event.target.value);
            }}
          ></textarea>
        </Edit>
      )}
      {acceptModal && (
        <Modal
          title="آیا از تایید اطمینان دارید؟"
          cancelModal={cancelModalHandler}
          submitModal={acceptModalHandler}
        />
      )}
      {rejectModal && (
        <Modal
          title="آیا از رد کامنت اطمینان دارید؟"
          cancelModal={cancelModalHandler}
          submitModal={rejectHandler}
        />
      )}
    </div>
  );
}
