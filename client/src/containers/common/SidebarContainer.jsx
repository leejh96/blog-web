import React, { useState, useEffect } from "react";
import SidebarComponent from "../../components/SideBarComponent/SidebarComponent";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createStudy, loadStudy, deleteStudy } from "../../actions/StudyAction";
function SidebarContainer() {
  const { pathname } = useLocation();
  const boardList = [
    {
      tag: "공지사항",
      link: "/notice/1",
    },
    {
      tag: "방명록",
      link: "/guestbook/1",
    },
  ];

  const settingList = [
    {
      tag: "닉네임 변경",
      link: "/mypage/nick",
    },
    {
      tag: "비밀번호 변경",
      link: "/mypage/password",
    },
    {
      tag: "회원 탈퇴",
      link: "/mypage/resign",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { studies, count } = useSelector((state) => state.StudyReducer);
  const user = useSelector((state) => state.UserReducer.user);

  useEffect(() => {
    dispatch(loadStudy()).then((res) => {
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
    return () => {
      setToggle(false);
      setText("");
    };
  }, [count]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };
  const onClickPlusBtn = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  const onClickCreateStudy = () => {
    if (!text) {
      return alert("추가내용을 입력하세요");
    }

    dispatch(createStudy(text)).then((res) => {
      if (res.data.success) {
        return setToggle(false);
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

  const onClickDeleteStudy = (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      return dispatch(deleteStudy(id)).then((res) => {
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
    }
  };

  return (
    <SidebarComponent
      boardList={boardList}
      settingList={settingList}
      pathname={pathname}
      onClickDeleteStudy={onClickDeleteStudy}
      onClickCreateStudy={onClickCreateStudy}
      onClickPlusBtn={onClickPlusBtn}
      onChangeText={onChangeText}
      studies={studies}
      user={user}
      toggle={toggle}
    />
  );
}

export default SidebarContainer;
