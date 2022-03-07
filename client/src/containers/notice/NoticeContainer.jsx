import React, { useState, useEffect } from "react";
import NoticeComponent from "../../components/NoticeComponent/NoticeComponent";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  loadNotice,
  searchNotice,
  noticeCount,
} from "../../actions/NoticeAction";
import {
  NOTICE_SEARCH_ERROR,
  SERVER_ERROR,
  LOAD_NOTICE_ERROR,
  LOAD_NOTICE,
} from "../../actions/type";

const pageCount = (cnt) => {
  let remainder = cnt % 10 ? 1 : 0;
  let pageCnt = parseInt(cnt / 10, 10) + remainder;
  return pageCnt;
};

function NoticeContainer() {
  const { page } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(false);
  const user = useSelector((state) => state.UserReducer.user);
  const search = useSelector((state) => state.NoticeReducer.search);
  const noticesCount = useSelector((state) => state.NoticeReducer.noticeCount);
  const [pageCnt, setPageCnt] = useState(1);
  const [text, setText] = useState("");
  const [type, setType] = useState("title");

  useEffect(() => {
    setLoad(true);
    dispatch(loadNotice(page)).then((res) => {
      if (res.type === LOAD_NOTICE_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
      if (res.type === LOAD_NOTICE) {
        setPosts(res.data);
        return setLoad(false);
      }
    });
    return () => {
      setPosts([]);
      setLoad(false);
    };
  }, [page]);

  useEffect(() => {
    dispatch(noticeCount()).then((res) => {
      setPageCnt(pageCount(res.data));
    });
  }, [noticesCount]);

  const onChangeSelect = (e) => {
    setType(e.target.value);
  };
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmithandler = (e) => {
    e.preventDefault();
    dispatch(searchNotice(text, type)).then((res) => {
      if (res.type === NOTICE_SEARCH_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
      return setPosts(res.data);
    });
  };
  return (
    <NoticeComponent
      user={user}
      search={search}
      load={load}
      posts={posts}
      pageCnt={pageCnt}
      page={page}
      onChangeText={onChangeText}
      onSubmithandler={onSubmithandler}
      onChangeSelect={onChangeSelect}
    />
  );
}

export default NoticeContainer;
