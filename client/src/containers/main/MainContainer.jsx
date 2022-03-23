import React, { useState, useEffect } from "react";
import MainComponent from "../../components/MainComponent/MainComponent";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadMainNotice } from "../../actions/NoticeAction";
import { loadMainStudy } from "../../actions/StudyAction";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function MainContainer() {
  const [notices, setNotices] = useState([]);
  const [posts, setPosts] = useState([]);
  const { count } = useSelector((state) => state.StudyReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadMainNotice()).then((res) => {
      if (res.data.success) {
        return setNotices(res.data.notices);
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

    dispatch(loadMainStudy()).then((res) => {
      if (res.data.success) {
        setPosts(res.data.studies);
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
      setNotices([]);
      setPosts([]);
      setIsLoading(true);
    };
  }, [count]);
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <MainComponent notices={notices} user={user} posts={posts} />
  );
}

export default MainContainer;
