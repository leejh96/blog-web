import React, { useState, useRef } from "react";
import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/UserAction";
import checkPassword from "../../util/CheckPassword";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
function RegisterContainer() {
  const [input, setInput] = useState({
    username: "",
    nick: "",
    email: "",
    password: "",
  });
  const emailRef = useRef(null);
  const { username, email, password, nick } = input;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (checkPassword(password)) {
      const data = {
        username,
        nick,
        email,
        password,
      };
      const res = await registerUser(data);
      if (res.data.success) {
        alert("회원가입이 완료 되었습니다.");
        setIsLoading(false);
        return history.push("/login");
      } else {
        if (res.status === 400) {
          alert(res.data.message);
          setInput({
            username: "",
            nick: "",
            email: "",
            password: "",
          });
          return setIsLoading(false);
        }
        return history.push({
          pathname: "/error",
          state: {
            status: res.status,
            message: res.data.message,
            text: res.statusText,
          },
        });
      }
    } else {
      setIsLoading(false);
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
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <RegisterComponent
      input={input}
      onSubmitRegister={onSubmitRegister}
      onChangeInput={onChangeInput}
      emailRef={emailRef}
    />
  );
}

export default RegisterContainer;
