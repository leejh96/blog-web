import React, { useState, useRef } from "react";
import { findUser } from "../../actions/UserAction";
import { useHistory } from "react-router-dom";
import {
  FIND_PASSWORD,
  NOT_FIND_PASSWORD,
  SERVER_ERROR,
} from "../../actions/type";
import { useDispatch } from "react-redux";
import FindPasswordComponent from "../../components/FindComponent/FindPasswordComponent";

function PasswordContainer() {
  const history = useHistory();
  const emailRef = useRef();
  const [input, setInput] = useState({
    email: "",
    username: "",
  });
  const { email, username } = input;
  const dispatch = useDispatch();

  const onSubmitData = (e) => {
    e.preventDefault();
    dispatch(findUser(username, email)).then((res) => {
      if (res.type === FIND_PASSWORD) {
        return history.push("/password", {
          userId: res.data.user,
        });
      }
      if (res.type === NOT_FIND_PASSWORD) {
        alert(res.data.message);
        setInput({
          email: "",
          username: "",
        });
        return emailRef.current.focus();
      }
      if (res.type === SERVER_ERROR) {
        history.push("/error/500");
      }
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
