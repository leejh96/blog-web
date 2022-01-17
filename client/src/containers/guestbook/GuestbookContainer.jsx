import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGuestBook,
  loadGuestBook,
  createGuestBook,
  countGuestBook,
} from "../../actions/GuestbookAction";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  SERVER_ERROR,
  AUTH_ERROR,
  DELETE_GUESTBOOK,
  DELETE_GUESTBOOK_ERROR,
  LOAD_GUESTBOOK,
  LOAD_GUESTBOOK_ERROR,
  CREATE_GUESTBOOK,
  CREATE_GUESTBOOK_ERROR,
  COUNT_GUESTBOOK,
  COUNT_GUESTBOOK_ERROR,
} from "../../actions/type";
import GuestbookComponent from "../../components/views/GuestbookPage/GuestbookComponent.jsx";

function GuestbookContainer() {
  const [load, setLoad] = useState(false);
  const [guest, setGuest] = useState([]);
  const [pageCnt, setPageCnt] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = useParams();
  const [text, setText] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const textRef = useRef(null);
  useEffect(() => {
    setLoad(true);
    dispatch(loadGuestBook(page)).then((res) => {
      if (res.type === LOAD_GUESTBOOK) {
        setGuest(res.data);
        return setLoad(false);
      }
      if (res.type === LOAD_GUESTBOOK_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
    return () => {
      setLoad(false);
      setGuest([]);
    };
  }, [dispatch, page, history]);

  useEffect(() => {
    setLoad(true);
    dispatch(countGuestBook()).then((res) => {
      if (res.type === COUNT_GUESTBOOK) {
        setPageCnt(res.data);
        return setLoad(false);
      }
      if (res.type === COUNT_GUESTBOOK_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
    return () => {
      setLoad(false);
      setGuest([]);
    };
  }, []);

  const onClickDeleteBtn = (id) => {
    const data = { data: { id } };
    dispatch(deleteGuestBook(data)).then((res) => {
      if (res.type === DELETE_GUESTBOOK) {
        return history.push("/guestbook/1");
      }
      if (res.type === DELETE_GUESTBOOK_ERROR) {
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

  const onClickCreateBtn = () => {
    const data = {
      text,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    if (user._id) {
      dispatch(createGuestBook(data)).then((res) => {
        if (res.type === CREATE_GUESTBOOK) {
          setText("");
          return textRef.current.focus();
        }
        if (res.type === CREATE_GUESTBOOK_ERROR) {
          alert(res.data.message);
          setText("");
          return textRef.current.focus();
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
      alert("로그인이 필요합니다");
      return history.push("/login");
    }
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <GuestbookComponent
      onClickCreateBtn={onClickCreateBtn}
      onChangeText={onChangeText}
      onClickDeleteBtn={onClickDeleteBtn}
      load={load}
      guest={guest}
      page={page}
      user={user}
      textRef={textRef}
    />
  );
}

export default GuestbookContainer;
