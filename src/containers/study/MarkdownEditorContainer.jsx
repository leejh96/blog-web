import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { loadOneStudy, updateStudy } from "../../actions/StudyAction";
import MarkdownEditorComponent from "../../components/EditComponent/Study/MarkdownEditorComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
function MarkdownEditContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const page = useParams().study;
  const [text, setText] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOneStudy(page)).then((res) => {
      if (res.data.success) {
        setText(res.data.study.text);
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
  }, []);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onClickUpdateStudy = async () => {
    const res = await updateStudy(page, text);
    if (res.data.success) {
      return history.push(`/study/${page}`);
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

  const onClickCancel = () => {
    history.push(`/study/${page}`);
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <MarkdownEditorComponent
      onChangeText={onChangeText}
      onClickUpdateStudy={onClickUpdateStudy}
      onClickCancel={onClickCancel}
      text={text}
    />
  );
}

export default MarkdownEditContainer;
