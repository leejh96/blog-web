import React, { useEffect, useState, useRef } from "react";
import { loadCSS } from "fg-loadcss";
import LoginComponent from "../../components/views/LoginPage/LoginComponent";
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

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

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
