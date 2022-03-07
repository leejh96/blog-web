import React, { useState, useEffect } from "react";
import DetailComponent from "../../components/DetailComponent/DetailComponent";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  loadOneNotice,
  addLike,
  deleteLike,
  deleteNoticeComment,
  createNoticeComment,
  deleteNotice,
} from "../../actions/NoticeAction";
import {
  AUTH_ERROR,
  LOAD_ONE_NOTICE,
  LOAD_ONE_NOTICE_ERROR,
  LOAD_ONE_NOTICE_VALID_ERROR,
  SERVER_ERROR,
  ADD_LIKE,
  ADD_LIKE_ERROR,
  DELETE_LIKE,
  DELETE_LIKE_ERROR,
  CREATE_NOTICE_COMMENT,
  CREATE_NOTICE_COMMENT_ERROR,
  DELETE_NOTICE,
} from "../../actions/type";
import moment from "moment";

function DetailContainer() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [notice, setNotice] = useState({});
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const user = useSelector((state) => state.UserReducer.user);
  const [cnt, setCnt] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const leng = useSelector((state) => state.NoticeReducer.commentLength);
  useEffect(() => {
    setLoad(true);
    dispatch(loadOneNotice(postId)).then((res) => {
      if (res.type === LOAD_ONE_NOTICE) {
        setNotice(res.data);
        res.data.like.includes(user._id) ? setToggle(true) : setToggle(false);
        setCnt(res.data.like.length);
        setComments(res.data.comment);
        return setLoad(false);
      }
      if (res.type === LOAD_ONE_NOTICE_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === LOAD_ONE_NOTICE_VALID_ERROR) {
        return history.push("/Notfound");
      }
      if (res.type === AUTH_ERROR) {
        alert(res.data.message);
        return history.push("/login");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  }, [postId, leng, toggle]);

  const onClickDeleteNotice = (postId) => () => {
    dispatch(deleteNotice(postId)).then((res) => {
      if (res.type === DELETE_NOTICE) {
        return history.push("/notice/1");
      }
      if (res.type === AUTH_ERROR) {
        alert(res.data.message);
        return history.push("/login");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  };

  const onClickLike = () => {
    if (toggle === false) {
      dispatch(addLike(postId)).then((res) => {
        if (res.type === ADD_LIKE) {
          return setToggle(true);
        }
        if (res.type === ADD_LIKE_ERROR) {
          return alert(res.data.message);
        }
        if (res.type === AUTH_ERROR) {
          alert(res.data.message);
          return history.push("/login");
        }
        if (res.type === SERVER_ERROR) {
          return history.push("/error/500");
        }
      });
    } else {
      dispatch(deleteLike(postId)).then((res) => {
        if (res.type === DELETE_LIKE) {
          return setToggle(false);
        }
        if (res.type === DELETE_LIKE_ERROR) {
          return alert(res.data.message);
        }
        if (res.type === AUTH_ERROR) {
          alert(res.data.message);
          return history.push("/login");
        }
        if (res.type === SERVER_ERROR) {
          return history.push("/error/500");
        }
      });
    }
  };

  const onClickDeleteComment = (commentId) => {
    dispatch(deleteNoticeComment(commentId, postId)).then((res) => {
      if (res.type === AUTH_ERROR) {
        alert(res.data.message);
        return history.push("/login");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  };

  const onClickCreateComment = () => {
    if (text === "") {
      return alert("댓글을 입력하세요");
    }
    const data = {
      text,
      postId,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(createNoticeComment(data)).then((res) => {
      if (res.type === CREATE_NOTICE_COMMENT) {
        document.querySelector("#comment").value = "";
        return setText("");
      }
      if (res.type === CREATE_NOTICE_COMMENT_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === AUTH_ERROR) {
        alert(res.data.message);
        return history.push("/login");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  return (
    <DetailComponent
      notice={notice}
      user={user}
      load={load}
      toggle={toggle}
      cnt={cnt}
      postId={postId}
      comments={comments}
      onClickDeleteNotice={onClickDeleteNotice}
      onClickLike={onClickLike}
      onClickDeleteComment={onClickDeleteComment}
      onChangeText={onChangeText}
      onClickCreateComment={onClickCreateComment}
    />
  );
}

export default DetailContainer;
