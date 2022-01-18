import React, { useState, useEffect } from "react";
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
import GuestbookComponent from "../../components/views/GuestbookPage/GuestbookComponent";

const pageCount = (cnt) => {
  let remainder = cnt % 10 ? 1 : 0;
  let pageCnt = parseInt(cnt / 10, 10) + remainder;
  return pageCnt;
};

function GuestbookContainer() {
  const [load, setLoad] = useState(false);
  const [guest, setGuest] = useState([]);
  const [pageCnt, setPageCnt] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = useParams();
  const [text, setText] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const guestlength = useSelector(
    (state) => state.GuestbookReducer.guestlength
  );

  useEffect(() => {
    setLoad(true);
    dispatch(countGuestBook()).then((res) => {
      if (res.type === COUNT_GUESTBOOK) {
        setPageCnt(pageCount(res.data));
        return setLoad(false);
      }
      if (res.type === COUNT_GUESTBOOK_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
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
  }, [page, guestlength]);

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
          return setText("");
        }
        if (res.type === CREATE_GUESTBOOK_ERROR) {
          alert(res.data.message);
          return setText("");
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
      page={parseInt(page)}
      user={user}
      pageCnt={pageCnt}
    />
  );
}

export default GuestbookContainer;
