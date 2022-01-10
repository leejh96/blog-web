import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGuestBook, loadGuestBook } from "../../actions/GuestbookAction";
import Loading from "../../components/views/LoadingPage/Loading";
import { useHistory, useParams } from "react-router-dom";
import {
  SERVER_ERROR,
  AUTH_ERROR,
  DELETE_GUESTBOOK,
  DELETE_GUESTBOOK_ERROR,
  LOAD_GUESTBOOK,
  LOAD_GUESTBOOK_ERROR,
} from "../../actions/type";
import GuestbookComponent from "../../components/views/GuestbookPage/GuestbookComponent.jsx";

function GuestbookContainer() {
  const [load, setLoad] = useState(false);
  const [guest, setGuest] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = useParams();

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

  const onClickDelete = (id) => {
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

  return (
    <GuestbookComponent
      load={load}
      guest={guest}
      onClickDelete={onClickDelete}
    />
  );
}

export default GuestbookContainer;
