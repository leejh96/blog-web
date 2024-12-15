import React, { useState, useEffect } from "react";
import StudyComponent from "../../components/StudyComponent/StudyComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  deleteStudyComment,
  createStudyComment,
  loadOneStudy,
} from "../../actions/StudyAction";
import moment from "moment";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function handleBottom() {
  document.querySelector("#bottom").scrollIntoView({
    behavior: "smooth",
  });
}

function handleTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function StudyContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { countComment, study } = useSelector((state) => state.StudyReducer);
  const page = useParams().study;
  const user = useSelector((state) => state.UserReducer.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadOneStudy(page)).then((res) => {
      if (res.data.success) {
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
      setText("");
      setIsLoading(true);
    };
  }, [page, countComment]);

  const onClickDeleteComment = (commentId, page) => {
    dispatch(deleteStudyComment(commentId, page)).then((res) => {
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

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmitCreateComment = (e) => {
    e.preventDefault();
    if (!text) {
      return alert("댓글을 입력하세요");
    }
    const data = {
      text,
      page,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    if (user._id) {
      dispatch(createStudyComment(data)).then((res) => {
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
    } else {
      alert("로그인이 필요합니다");
      return history.push("/login");
    }
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <StudyComponent
      handleTop={handleTop}
      handleBottom={handleBottom}
      onClickDeleteComment={onClickDeleteComment}
      onSubmitCreateComment={onSubmitCreateComment}
      onChangeText={onChangeText}
      user={user}
      study={study}
      text={text}
    />
  );
}

export default StudyContainer;
