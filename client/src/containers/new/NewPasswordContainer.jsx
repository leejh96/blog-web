import React, { useState, useEffect } from "react";
import NewPasswordComponent from "../../components/NewPasswordComponent/NewpasswordComponent";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newPassword } from "../../actions/UserAction";
import {
  NEW_PASSWORD,
  NEW_PASSWORD_FAIL,
  SERVER_ERROR,
} from "../../actions/type";

const checkPassword = (password) => {
  const blank = /\s/;
  const regex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  if (!blank.test(password)) {
    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

function NewPasswordContainer() {
  const location = useLocation();
  const [input, setInput] = useState({
    password: "",
    confirm: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  //메인페이지에서 바로 비밀번호를 입력하는곳으로 가는 걸 막기위함
  useEffect(() => {
    if (!location.state) {
      history.push("/login");
    }
  }, [location.state]);

  const onSubmitData = (e) => {
    const { password, confirm } = input;
    e.preventDefault();
    if (checkPassword(password)) {
      if (password !== confirm) {
        alert("비밀번호가 일치하지 않습니다");
        return setInput({
          password: "",
          confirm: "",
        });
      }
      dispatch(newPassword(password, location.state.userId)).then((res) => {
        if (res.type === NEW_PASSWORD) {
          return history.push("/login");
        }
        if (res.type === NEW_PASSWORD_FAIL) {
          return alert(res.data.message);
        }
        if (res.type === SERVER_ERROR) {
          return history.push("/error/500");
        }
      });
    } else {
      return alert(
        "비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다"
      );
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickClose = () => {
    history.push("/login");
  };
  return (
    <NewPasswordComponent
      onChangeInput={onChangeInput}
      onSubmitData={onSubmitData}
      onClickClose={onClickClose}
      input={input}
    />
  );
}

export default NewPasswordContainer;
