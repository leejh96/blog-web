import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavBarComponent/NavbarComponent";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/UserAction";
import { loadStudy, createStudy, deleteStudy } from "../../actions/StudyAction";
import {
  AUTH_ERROR,
  LOGOUT_ERROR,
  LOGOUT_USER,
  SERVER_ERROR,
  CREATE_STUDY,
  CREATE_STUDY_ERROR,
  LOAD_STUDY,
  LOAD_STUDY_ERROR,
  DELETE_STUDY,
  DELETE_STUDY_ERROR,
} from "../../actions/type";

function NavbarContainer() {
  const onList = [
    {
      tag: "내 정보",
      link: "/setting",
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
      link: "/signup",
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
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  const [text, setText] = useState("");
  const [study, setStudy] = useState([]);
  const { studyCount } = useSelector((state) => ({
    studyCount: state.StudyReducer.studyCount,
  }));
  const [createToggle, setCreateToggle] = useState(false);
  const onClickMenu = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };
  useEffect(() => {
    dispatch(loadStudy()).then((res) => {
      if (res.type === LOAD_STUDY) {
        return setStudy(res.data);
      }
      if (res.type === LOAD_STUDY_ERROR) {
        return alert(res.data.message);
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
    });
    return () => {
      setToggle(false);
      setText("");
      setStudy([]);
    };
  }, [studyCount]);
  const onClickLogout = () => {
    let access = localStorage.getItem("access");
    if (!access) {
      access = "";
    }
    dispatch(logoutUser(access)).then((res) => {
      if (res.type === LOGOUT_USER && !localStorage.getItem("access")) {
        //google 로그아웃
        return history.push("/login");
      }
      if (res.type === LOGOUT_USER && localStorage.getItem("access")) {
        //로컬 로그아웃
        localStorage.removeItem("access");
        return history.push("/login");
      }
      if (res.type === AUTH_ERROR) {
        //세션 만료나 auth에서 어떠한 오류 발생
        localStorage.removeItem("access");
        alert(res.data.message);
        return history.push("/login");
      }
      if (res.type === SERVER_ERROR) {
        return history.push("/error/500");
      }
      if (res.type === LOGOUT_ERROR) {
        alert(res.data.message);
        return history.push("/");
      }
    });
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
      if (res.type === CREATE_STUDY) {
        return setToggle(false);
      }
      if (res.type === CREATE_STUDY_ERROR) {
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
  const onClickDeleteStudy = (id) => {
    if (window.confirm("삭제 하시겠습니까?")) {
      return dispatch(deleteStudy(id)).then((res) => {
        if (res.type === DELETE_STUDY) {
          return history.push("/");
        }
        if (res.type === DELETE_STUDY_ERROR) {
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
      study={study}
      createToggle={createToggle}
      boardList={boardList}
    />
  );
}

export default NavbarContainer;
