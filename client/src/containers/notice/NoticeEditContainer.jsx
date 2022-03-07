import React, { useState, useEffect } from "react";
import NoticeEditComponent from "../../components/EditComponent/Notice/NoticeEditComponent";
import { useDispatch } from "react-redux";
import {
  LOAD_ONE_NOTICE,
  LOAD_ONE_NOTICE_ERROR,
  LOAD_ONE_NOTICE_VALID_ERROR,
  AUTH_ERROR,
  SERVER_ERROR,
  UPDATE_NOTICE,
  UPDATE_NOTICE_ERROR,
  CREATE_NOTICE,
} from "../../actions/type";
import {
  loadOneNotice,
  updateNotice,
  createNotice,
} from "../../actions/NoticeAction";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

function NoticeEditContainer() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [load, setLoad] = useState(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoad(true);
    if (!postId) {
      setLoad(false);
      return;
    }
    dispatch(loadOneNotice(postId)).then((res) => {
      if (res.type === LOAD_ONE_NOTICE) {
        setTitle(res.data.title);
        setText(res.data.text);
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
  }, [postId]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const data = {
      postId,
      title,
      text,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(updateNotice(data)).then((res) => {
      if (res.type === UPDATE_NOTICE) {
        return history.push("/notice/1");
      }
      if (res.type === UPDATE_NOTICE_ERROR) {
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

  const onCreateHandler = (e) => {
    e.preventDefault();
    const data = {
      title,
      text,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(createNotice(data)).then((res) => {
      if (res.type === CREATE_NOTICE) {
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
  return (
    <NoticeEditComponent
      postId={postId}
      load={load}
      title={title}
      text={text}
      onUpdateHandler={onUpdateHandler}
      onCreateHandler={onCreateHandler}
      onChangeTitle={onChangeTitle}
      onChangeText={onChangeText}
    />
  );
}

export default NoticeEditContainer;
