import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { loadOneStudy, updateStudyText } from "../../actions/StudyAction";
import {
  AUTH_ERROR,
  LOAD_ONE_STUDY,
  LOAD_ONE_STUDY_ERROR,
  SERVER_ERROR,
  UPDATE_STUDY_TEXT,
  UPDATE_STUDY_TEXT_ERROR,
} from "../../actions/type";
import MarkdownEditorComponent from "../../components/views/EditPage/Study/MarkdownEditorComponent";

function MarkdownEditContainer() {
  const page = useParams().study;
  const [text, setText] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOneStudy(page)).then((res) => {
      if (res.type === LOAD_ONE_STUDY) {
        setText(res.data.page.text);
      }
      if (res.type === LOAD_ONE_STUDY_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
  }, [dispatch, page, history]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onClickUpdate = () => {
    dispatch(updateStudyText(page, text)).then((res) => {
      if (res.type === UPDATE_STUDY_TEXT) {
        return history.push(`/study/${page}`);
      }
      if (res.type === UPDATE_STUDY_TEXT_ERROR) {
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
  const onClickCancel = () => {
    history.push(`/study/${page}`);
  };
  return (
    <MarkdownEditorComponent
      onChangeText={onChangeText}
      onClickUpdate={onClickUpdate}
      onClickCancel={onClickCancel}
      text={text}
    />
  );
}

export default MarkdownEditContainer;
