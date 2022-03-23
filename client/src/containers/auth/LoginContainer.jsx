import React, { useState, useRef } from "react";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/UserAction";

function LoginContainer() {
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

  const onSubmitInfo = async (e) => {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res.data.success) {
      localStorage.setItem("access", res.data.accessToken);
      return history.push("/");
    }
    if (res.status === 401 || res.status === 404) {
      alert(res.data.message);
      return setInput({
        email: "",
        password: "",
      });
    }
    return history.push({
      pathname: "/error",
      state: {
        status: res.status,
        message: res.data.message,
        text: res.statusText,
      },
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
