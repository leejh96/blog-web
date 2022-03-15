import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGuestBook,
  loadGuestBook,
  createGuestBook,
  countGuestBook,
} from "../../actions/GuestbookAction";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import GuestbookComponent from "../../components/GuestbookComponent/GuestbookComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import pageCount from "../../util/pageCount";

function GuestbookContainer() {
  const [pageCnt, setPageCnt] = useState(1);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.UserReducer.user);
  const { guestbooks, count } = useSelector((state) => state.GuestbookReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { page } = useParams();

  useEffect(() => {
    dispatch(countGuestBook()).then((res) => {
      if (res.data.success) {
        return setPageCnt(pageCount(res.data.count));
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

    dispatch(loadGuestBook(page)).then((res) => {
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
      setPageCnt(1);
      setIsLoading(true);
      setText("");
    };
  }, [page, count]);

  const onClickDeleteBtn = (guestbookId) => {
    dispatch(deleteGuestBook(guestbookId)).then((res) => {
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

  const onSubmitCreate = (e) => {
    e.preventDefault();
    const data = {
      text,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    if (user._id) {
      dispatch(createGuestBook(data)).then((res) => {
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

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <GuestbookComponent
      onSubmitCreate={onSubmitCreate}
      onChangeText={onChangeText}
      onClickDeleteBtn={onClickDeleteBtn}
      guestbooks={guestbooks}
      page={parseInt(page)}
      user={user}
      pageCnt={pageCnt}
    />
  );
}

export default GuestbookContainer;
