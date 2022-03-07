import React, { useState, useRef } from "react";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/UserAction";
import { useDispatch } from "react-redux";
import { SERVER_ERROR } from "../../actions/type";

function LoginContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef(null);
  const { email, password } = input;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onSubmitInfo = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password)).then((res) => {
      if (res.data.success) {
        localStorage.setItem("access", res.data.accessToken);
        return history.push("/");
      } else {
        if (res.type === SERVER_ERROR) {
          return history.push("/error/500");
        } else {
          alert(res.data.message);
          setInput({
            email: "",
            password: "",
          });
          return emailRef.current.focus();
        }
      }
    });
  };
  return (
    <LoginComponent
      email={email}
      password={password}
      onChangeInput={onChangeInput}
      onSubmitInfo={onSubmitInfo}
      emailRef={emailRef}
    />
  );
}

export default LoginContainer;
