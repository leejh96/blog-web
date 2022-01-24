import React, { useState, useEffect } from "react";
import MainComponent from "../../components/views/MainPage/MainComponent";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mainLoadNotice } from "../../actions/NoticeAction";
import { loadMainStudy } from "../../actions/StudyAction";

import {
  MAIN_LOAD_NOTICE,
  MAIN_LOAD_NOTICE_ERROR,
  SERVER_ERROR,
  LOAD_MAIN_STUDY,
  LOAD_MAIN_STUDY_ERROR,
} from "../../actions/type";

function MainContainer() {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const studyCount = useSelector((state) => state.StudyReducer.studyCount);

  useEffect(() => {
    dispatch(mainLoadNotice()).then((res) => {
      if (res.type === MAIN_LOAD_NOTICE) {
        return setNotices(res.data);
      }
      if (res.type === MAIN_LOAD_NOTICE_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
    return () => {
      setNotices([]);
    };
  }, []);

  useEffect(() => {
    dispatch(loadMainStudy()).then((res) => {
      if (res.type === LOAD_MAIN_STUDY) {
        return setPosts(res.data);
      }
      if (res.type === LOAD_MAIN_STUDY_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
    return () => {
      setPosts([]);
    };
  }, [studyCount]);
  return <MainComponent notices={notices} user={user} posts={posts} />;
}

export default MainContainer;
