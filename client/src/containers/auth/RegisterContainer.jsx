import React, { useState, useRef } from "react";
import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/UserAction";
import { SERVER_ERROR } from "../../actions/type";

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

function RegisterContainer() {
  const [input, setInput] = useState({
    username: "",
    nick: "",
    email: "",
    password: "",
  });
  const emailRef = useRef(null);
  const { username, email, password, nick } = input;
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitRegister = (e) => {
    e.preventDefault();
    if (checkPassword(password)) {
      const data = {
        username,
        nick,
        email,
        password,
      };
      dispatch(registerUser(data)).then((res) => {
        if (res.data.success) {
          return history.push("/login");
        } else {
          if (res.type === SERVER_ERROR) {
            return history.push("/error/500");
          } else {
            alert(res.data.message);
            setInput({
              email: "",
              password: "",
              username: "",
              nick: "",
            });
            return emailRef.current.focus();
          }
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
  return (
    <RegisterComponent
      input={input}
      onSubmitRegister={onSubmitRegister}
      onChangeInput={onChangeInput}
      emailRef={emailRef}
    />
  );
}

export default RegisterContainer;
