import React, { useState, useRef } from "react";
import { findUser } from "../../actions/UserAction";
import { useHistory } from "react-router-dom";
import FindPasswordComponent from "../../components/FindComponent/FindPasswordComponent";

function PasswordContainer() {
  const history = useHistory();
  const emailRef = useRef();
  const [input, setInput] = useState({
    email: "",
    username: "",
  });
  const { email, username } = input;

  const onSubmitData = async (e) => {
    e.preventDefault();
    const res = await findUser(username, email);
    if (res.data.success) {
      return history.push("/password", {
        userId: res.data.user,
      });
    }
    if (res.status === 404) {
      alert(res.data.message);
      setInput({
        email: "",
        username: "",
      });
      return emailRef.current.focus();
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
    <FindPasswordComponent
      onSubmitData={onSubmitData}
      onChangeInput={onChangeInput}
      onClickClose={onClickClose}
      email={email}
      username={username}
      emailRef={emailRef}
    />
  );
}

export default PasswordContainer;
