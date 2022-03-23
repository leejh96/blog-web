import React, { useState, useEffect } from "react";
import NewPasswordComponent from "../../components/NewPasswordComponent/NewpasswordComponent";
import { useHistory, useLocation } from "react-router-dom";
import { newPassword } from "../../actions/UserAction";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import checkPassword from "../../util/CheckPassword";

function NewPasswordContainer() {
  const location = useLocation();
  const [input, setInput] = useState({
    password: "",
    confirm: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  //메인페이지에서 바로 비밀번호를 입력하는곳으로 가는 걸 막기위함
  useEffect(() => {
    if (!location.state) {
      history.push("/");
    }
    return () => {
      setInput({
        password: "",
        confirm: "",
      });
      setIsLoading(false);
    };
  }, [location.state]);

  const onSubmitData = async (e) => {
    e.preventDefault();
    const { password, confirm } = input;
    if (checkPassword(password)) {
      if (password !== confirm) {
        alert("비밀번호가 일치하지 않습니다");
        return setInput({
          password: "",
          confirm: "",
        });
      }
      setIsLoading(true);
      const res = await newPassword(password, location.state.userId);
      if (res.data.success) {
        alert(res.data.message);
        setIsLoading(false);
        return history.push("/login");
      }
      return history.push({
        pathname: "/error",
        state: {
          status: res.status,
          message: res.data.message,
          text: res.statusText,
        },
      });
    } else {
      alert(
        "비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다"
      );
      return setInput({
        password: "",
        confirm: "",
      });
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
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <NewPasswordComponent
      onChangeInput={onChangeInput}
      onSubmitData={onSubmitData}
      onClickClose={onClickClose}
      input={input}
    />
  );
}

export default NewPasswordContainer;
