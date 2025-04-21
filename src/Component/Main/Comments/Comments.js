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
  const [action, setAction] = useState(false);
  const [edit, setEdit] = useState(null);
  const [detail, setdetail] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [commentAccept, setCommentAccept] = useState(null);

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
    setAction(false);
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
      setAction(false);
    });
  };
  const acceptHandler = () => {
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
                  <td className="btn-table btn-button-table">
                    <button
                      className="desktop-size-action"
                      onClick={() => {
                        setDeleteModal(true);
                        setCommentId(comment.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      className="desktop-size-action"
                      onClick={() => {
                        setEditModal(true);
                        setEdit(comment.body);
                        setCommentId(comment.id);
                      }}
                    >
                      ویرایش
                    </button>
                    <button className="desktop-size-action">پاسخ</button>
                    {comment.isAccept === 0 ? (
                      <button
                        className="desktop-size-action"
                        onClick={() => {
                          setAcceptModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        className="desktop-size-action"
                        onClick={() => {
                          setRejectModal(true);
                          setCommentId(comment.id);
                        }}
                      >
                        رد کامنت
                      </button>
                    )}
                    <button
                      className="mobile-size-action"
                      onClick={() => {
                        setAction(true);
                        setCommentId(comment.id);
                        setEdit(comment.body);
                        setCommentAccept(comment.isAccept);
                      }}
                    >
                      اقدامات
                    </button>
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
        <Edit submitHandler={submitHandler}>
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
          submitModal={acceptHandler}
        />
      )}
      {rejectModal && (
        <Modal
          title="آیا از رد کامنت اطمینان دارید؟"
          cancelModal={cancelModalHandler}
          submitModal={rejectHandler}
        />
      )}
      {action && (
        <Detail clickBody={clickBody}>
          <>
            <div className="btn-table">
              <button onClick={() => setDeleteModal(true)}>حذف</button>
              <button onClick={() => setEditModal(true)}>ویرایش</button>
              <button>پاسخ</button>
              {commentAccept === 0 ? (
                <button
                onClick={acceptHandler}
                >تایید</button>
              ) : (
                <button onClick={rejectHandler}>رد کامنت </button>
              )}
            </div>
          </>
        </Detail>
      )}
    </div>
  );
}
