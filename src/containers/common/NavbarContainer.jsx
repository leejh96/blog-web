import React, { useState } from "react";
import NavbarComponent from "../../components/NavBarComponent/NavbarComponent";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, logoutOauth } from "../../actions/UserAction";
import { createStudy, deleteStudy } from "../../actions/StudyAction";
import getCookie from "../../util/getCookie";

function NavbarContainer() {
  const onList = [
    {
      tag: "내 정보",
      link: "/mypage",
    },
    {
      tag: "로그아웃",
      link: "#",
    },
  ];

  const offList = [
    {
      tag: "로그인",
      link: "/login",
    },
    {
      tag: "회원가입",
      link: "/register",
    },
  ];

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

  const categories = [
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

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  const [text, setText] = useState("");
  const { studies } = useSelector((state) => state.StudyReducer);
  const [createToggle, setCreateToggle] = useState(false);
  const access = localStorage.getItem("access");
  const OauthCookie = getCookie(document.cookie).find(
    (cookie) => cookie.key === "oauth"
  );
  const onClickMenu = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const onClickLogout = () => {
    if (access) {
      dispatch(logoutUser()).then((res) => {
        if (res.data.success) {
          localStorage.removeItem("access");
          return history.push("/login");
        }
        if (res.status === 401) {
          alert(res.data.message);
          return history.push("/login");
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
    }
    if (OauthCookie) {
      dispatch(logoutOauth()).then((res) => {
        if (res.data.success) {
          return history.push("/login");
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
    }
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onClickPlusBtn = () => {
    createToggle ? setCreateToggle(false) : setCreateToggle(true);
  };

  const onClickCreateStudy = () => {
    if (!text) {
      return alert("추가내용을 입력하세요");
    }

    dispatch(createStudy(text)).then((res) => {
      if (res.data.success) {
        setToggle(false);
        return setCreateToggle(false);
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
        if (res.data.success) {
          return history.push("/");
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
    }
  };

  return (
    <NavbarComponent
      onList={onList}
      offList={offList}
      onClickLogout={onClickLogout}
      user={user}
      pathname={pathname}
      onClickMenu={onClickMenu}
      toggle={toggle}
      onClickDeleteStudy={onClickDeleteStudy}
      onClickCreateStudy={onClickCreateStudy}
      onClickPlusBtn={onClickPlusBtn}
      onChangeText={onChangeText}
      studies={studies}
      createToggle={createToggle}
      boardList={boardList}
      access={access}
      OauthCookie={OauthCookie}
      categories={categories}
    />
  );
}

export default NavbarContainer;
