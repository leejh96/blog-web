import React, { useState, useEffect } from "react";
import NoticeComponent from "../../components/NoticeComponent/NoticeComponent";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  loadNotice,
  searchNotice,
  countNotice,
} from "../../actions/NoticeAction";

import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import pageCount from "../../util/pageCount";

function NoticeContainer() {
  const { page } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const { search, count, notices, countSearch } = useSelector(
    (state) => state.NoticeReducer
  );
  const [pageCnt, setPageCnt] = useState(1);
  const [input, setInput] = useState({
    text: "",
    type: "title",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(countNotice()).then((res) => {
      if (res.data.success) {
        return setPageCnt(pageCount(count));
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
    dispatch(loadNotice(page)).then((res) => {
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
      setIsLoading(true);
      setPageCnt(1);
      setInput({
        text: "",
        type: "title",
      });
    };
  }, [page, count]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmithandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    dispatch(searchNotice(input)).then((res) => {
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
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <NoticeComponent
      input={input}
      user={user}
      search={search}
      notices={notices}
      pageCnt={pageCnt}
      page={page}
      countSearch={countSearch}
      onSubmithandler={onSubmithandler}
      onChangeInput={onChangeInput}
    />
  );
}

export default NoticeContainer;
