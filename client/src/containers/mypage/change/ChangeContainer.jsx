import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  changeNick,
  changePassword,
  resignUser,
  resignOAuthUser,
} from "../../../actions/UserAction";
import {
  AUTH_ERROR,
  SERVER_ERROR,
  UPDATE_NICK,
  UPDATE_NICK_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  BCRYPT_ERROR,
} from "../../../actions/type";
import ChangeComponent from "../../../components/MyPageComponent/section/ChangeComponent";
import checkPassword from "../../../util/CheckPassword";

function ChangeContainer() {
  const [nick, setNick] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { change } = useParams();
  const [input, setInput] = useState({
    password: "",
    confirm: "",
  });

  const onSubmitChangeNick = (e) => {
    e.preventDefault();
    if (user.nick === nick) {
      return alert("기존 닉네임과 같습니다");
    }
    dispatch(changeNick(nick)).then((res) => {
      if (res.type === UPDATE_NICK) {
        alert(res.data.message);
        setNick("");
        return history.push("/mypage");
      }
      if (res.type === UPDATE_NICK_ERROR) {
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
  const onClickCancelNick = () => {
    setNick("");
    return history.push("/mypage");
  };
  const onChangeNick = (e) => {
    setNick(e.target.value);
  };

  // password
  const onSubmitPassword = (e) => {
    const { password, confirm } = input;
    e.preventDefault();
    if (checkPassword(password)) {
      setInput({
        password: "",
        confirm: "",
      });
      if (password !== confirm) {
        return alert("비밀번호가 다릅니다.");
      }
      dispatch(changePassword(password)).then((res) => {
        if (res.type === UPDATE_PASSWORD) {
          setInput({
            password: "",
            confirm: "",
          });
          alert(res.data.message);
          return history.push("/mypage");
        }
        if (res.type === UPDATE_PASSWORD_ERROR) {
          setInput({
            password: "",
            confirm: "",
          });
          return alert(res.data.message);
        }
        if (res.type === AUTH_ERROR) {
          setInput({
            password: "",
            confirm: "",
          });
          alert(res.data.message);
          return history.push("/login");
        }
        if (res.type === SERVER_ERROR) {
          setInput({
            password: "",
            confirm: "",
          });
          return history.push("/error/500");
        }
      });
    } else {
      setInput({
        password: "",
        confirm: "",
      });
      return alert(
        "비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다"
      );
    }
  };
  const onClickCancelPassword = () => {
    return history.push("/mypage");
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  //resign
  const onClickResign = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      if (user.provider === "local") {
        const password = window.prompt(
          "탈퇴를 위한 아이디의 비밀번호를 입력해주시기 바랍니다."
        );
        dispatch(resignUser(password)).then((res) => {
          if (res.type === DELETE_USER) {
            alert(res.data.message);
            localStorage.removeItem("access");
            return history.push("/");
          }
          if (res.type === DELETE_USER_ERROR) {
            return alert(res.data.message);
          }
          if (res.type === AUTH_ERROR) {
            alert(res.data.message);
            return history.push("/login");
          }
          if (res.type === BCRYPT_ERROR) {
            history.push("/error/500");
          }
          if (res.type === SERVER_ERROR) {
            history.push("/error/500");
          }
        });
      } else {
        dispatch(resignOAuthUser()).then((res) => {
          if (res.type === DELETE_USER) {
            alert(res.data.message);
            return history.push("/");
          }
          if (res.type === DELETE_USER_ERROR) {
            return alert(res.data.message);
          }
          if (res.type === SERVER_ERROR) {
            return history.push("/error/500");
          }
        });
      }
    }
  };

  return (
    <ChangeComponent
      nick={nick}
      user={user}
      change={change}
      onSubmitChangeNick={onSubmitChangeNick}
      onClickCancelNick={onClickCancelNick}
      onChangeNick={onChangeNick}
      input={input}
      onSubmitPassword={onSubmitPassword}
      onClickCancelPassword={onClickCancelPassword}
      onChangeInput={onChangeInput}
      onClickResign={onClickResign}
    />
  );
}

export default ChangeContainer;
