import React, { useState, useEffect } from "react";
import SidebarComponent from "../../components/views/SideBar/SidebarComponent";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createStudy, loadStudy, deleteStudy } from "../../actions/StudyAction";
import {
  CREATE_STUDY,
  CREATE_STUDY_ERROR,
  AUTH_ERROR,
  SERVER_ERROR,
  LOAD_STUDY,
  LOAD_STUDY_ERROR,
  DELETE_STUDY,
  DELETE_STUDY_ERROR,
} from "../../actions/type";
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
      link: "/setting/nick",
    },
    {
      tag: "비밀번호 변경",
      link: "/setting/password",
    },
    {
      tag: "회원 탈퇴",
      link: "/setting/resign",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const [study, setStudy] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { studyCount } = useSelector((state) => ({
    studyCount: state.StudyReducer.studyCount,
  }));
  const user = useSelector((state) => state.UserReducer.user);
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
  }, [dispatch, studyCount, history]);

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
    <SidebarComponent
      boardList={boardList}
      settingList={settingList}
      pathname={pathname}
      onClickDeleteStudy={onClickDeleteStudy}
      onClickCreateStudy={onClickCreateStudy}
      onClickPlusBtn={onClickPlusBtn}
      onChangeText={onChangeText}
      study={study}
      user={user}
      toggle={toggle}
    />
  );
}

export default SidebarContainer;
