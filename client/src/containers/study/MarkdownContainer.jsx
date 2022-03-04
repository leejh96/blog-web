import React, { useEffect, useState } from "react";
import MarkdownComponent from "../../components/views/StudyPage/section/MarkdownComponent";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOneStudy } from "../../actions/StudyAction";
import {
  LOAD_ONE_STUDY,
  LOAD_ONE_STUDY_ERROR,
  SERVER_ERROR,
} from "../../actions/type";
import emoji from "emoji-dictionary"; //이모티콘을 불러옴

const emojiSupport = (text) => {
  return text.replace(/:\w+:/gi, (name) => {
    if (emoji.getUnicode(name)) {
      return emoji.getUnicode(name);
    } else {
      return "";
    }
  });
};

function MarkdownContainer() {
  const page = useParams().study;
  const dispatch = useDispatch();
  const history = useHistory();
  const [text, setText] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    dispatch(loadOneStudy(page)).then((res) => {
      if (res.type === LOAD_ONE_STUDY) {
        setText(emojiSupport(res.data.page.text));
        setLoad(false);
      }
      if (res.type === LOAD_ONE_STUDY_ERROR) {
        return history.push("/Notfound");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
    return () => {
      setLoad(false);
      setText("");
    };
  }, [dispatch, page, history]);

  return <MarkdownComponent load={load} text={text} user={user} page={page} />;
}

export default MarkdownContainer;
