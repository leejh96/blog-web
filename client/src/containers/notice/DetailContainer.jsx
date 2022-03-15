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
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function DetailContainer() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { notice, countComment, countLike } = useSelector(
    (state) => state.NoticeReducer
  );

  useEffect(() => {
    dispatch(loadOneNotice(postId)).then((res) => {
      if (res.data.success) {
        !res.data.notice.like.includes(user._id)
          ? setToggle(false)
          : setToggle(true);
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
    return () => {
      setToggle(false);
      setText("");
      setIsLoading(true);
    };
  }, [postId, countLike, countComment]);

  const onClickDeleteNotice = (postId) => {
    dispatch(deleteNotice(postId)).then((res) => {
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

  const onClickLike = () => {
    if (!toggle) {
      dispatch(addLike(postId)).then((res) => {
        if (res.data.success) {
          return setToggle(true);
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
      dispatch(deleteLike(postId)).then((res) => {
        if (res.data.success) {
          setToggle(false);
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
    }
  };

  const onClickDeleteComment = (commentId) => {
    dispatch(deleteNoticeComment(commentId, postId)).then((res) => {
      if (!res.data.success) {
        return history.push({
          pathname: "/error",
          state: {
            status: res.status,
            message: res.data.message,
            text: res.statusText,
          },
        });
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
      if (res.data.success) {
        return setText("");
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
  const onChangeText = (e) => {
    setText(e.target.value);
  };
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <DetailComponent
      notice={notice}
      user={user}
      toggle={toggle}
      countLike={countLike}
      postId={postId}
      text={text}
      onClickDeleteNotice={onClickDeleteNotice}
      onClickLike={onClickLike}
      onClickDeleteComment={onClickDeleteComment}
      onChangeText={onChangeText}
      onClickCreateComment={onClickCreateComment}
    />
  );
}

export default DetailContainer;
