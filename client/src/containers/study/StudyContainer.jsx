import React, { useState, useEffect } from "react";
import StudyComponent from "../../components/views/StudyPage/StudyComponent";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  loadStudyComment,
  deleteStudyComment,
  createStudyComment,
} from "../../actions/StudyAction";
import {
  AUTH_ERROR,
  DELETE_STUDY_COMMENT,
  DELETE_STUDY_COMMENT_ERROR,
  LOAD_STUDY_COMMENT,
  LOAD_STUDY_COMMENT_ERROR,
  CREATE_STUDY_COMMENT,
  CREATE_STUDY_COMMENT_ERROR,
  SERVER_ERROR,
} from "../../actions/type";
import moment from "moment";

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
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");
  const leng = useSelector((state) => state.StudyReducer.commentLength);
  const { study } = useParams();
  const user = useSelector((state) => state.UserReducer.user);
  const history = useHistory();
  useEffect(() => {
    dispatch(loadStudyComment(study)).then((res) => {
      if (res.type === LOAD_STUDY_COMMENT) {
        return setComment(res.data.comment);
      }
      if (res.type === LOAD_STUDY_COMMENT_ERROR) {
        return setComment([]);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  }, [study, leng]);

  const onClickDelete = (commentId, study) => () => {
    dispatch(deleteStudyComment(commentId, study)).then((res) => {
      if (res.type === DELETE_STUDY_COMMENT) {
        return setComment(res.data);
      }
      if (res.type === DELETE_STUDY_COMMENT_ERROR) {
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

  const onClickCreateComment = () => {
    if (!text) {
      return alert("댓글을 입력하세요");
    }
    const data = {
      text,
      study,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    if (user._id) {
      dispatch(createStudyComment(data)).then((res) => {
        if (res.type === CREATE_STUDY_COMMENT) {
          return setText("");
        }
        if (res.type === CREATE_STUDY_COMMENT_ERROR) {
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
      alert("로그인이 필요합니다");
      return history.push("/login");
    }
  };

  return (
    <StudyComponent
      handleTop={handleTop}
      handleBottom={handleBottom}
      onClickDelete={onClickDelete}
      onClickCreateComment={onClickCreateComment}
      onChangeText={onChangeText}
      comment={comment}
      user={user}
      study={study}
      text={text}
    />
  );
}

export default StudyContainer;
