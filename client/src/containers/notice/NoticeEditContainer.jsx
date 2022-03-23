import React, { useState, useEffect } from "react";
import NoticeEditComponent from "../../components/EditComponent/Notice/NoticeEditComponent";
import { useDispatch } from "react-redux";
import {
  loadOneNotice,
  updateNotice,
  createNotice,
} from "../../actions/NoticeAction";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function NoticeEditContainer() {
  const [input, setInput] = useState({
    title: "",
    text: "",
  });
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      dispatch(loadOneNotice(postId)).then((res) => {
        if (res.data.success) {
          setInput({
            title: res.data.notice.title,
            text: res.data.notice.text,
          });
          return setIsLoading(false);
        }
        return history.push({
          pathname: "/error",
          state: {
            status: res.status,
            message: res.data.message,
            text: res.statusText,
          },
        });
      });
    } else {
      setIsLoading(false);
    }
    return () => {
      setInput({
        title: "",
        text: "",
      });
    };
  }, [postId]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    const data = {
      postId,
      input,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    const res = await updateNotice(data);
    if (res.data.success) {
      return history.push("/notice/1");
    }
    return history.push({
      pathname: "/error",
      state: {
        status: res.status,
        message: res.data.message,
        text: res.statusText,
      },
    });
  };

  const onCreateHandler = (e) => {
    e.preventDefault();
    const data = {
      input,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    dispatch(createNotice(data)).then((res) => {
      if (res.data.success) {
        return history.push("/notice/1");
      }
      return history.push({
        pathname: "/error",
        state: {
          status: res.status,
          message: res.data.message,
          text: res.statusText,
        },
      });
    });
  };
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <NoticeEditComponent
      postId={postId}
      input={input}
      onChangeInput={onChangeInput}
      onUpdateHandler={onUpdateHandler}
      onCreateHandler={onCreateHandler}
    />
  );
}

export default NoticeEditContainer;
