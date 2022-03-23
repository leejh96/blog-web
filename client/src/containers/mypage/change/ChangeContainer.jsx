import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  changeNick,
  changePassword,
  resignUser,
  resignOAuthUser,
} from "../../../actions/UserAction";
import ChangeComponent from "../../../components/MyPageComponent/section/ChangeComponent";
import checkPassword from "../../../util/CheckPassword";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
function ChangeContainer() {
  const [nick, setNick] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { change } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    password: "",
    confirm: "",
  });

  useEffect(() => {
    return () => {
      setNick("");
      setInput({
        password: "",
        confirm: "",
      });
      setIsLoading(false);
    };
  }, []);

  const onSubmitChangeNick = async (e) => {
    e.preventDefault();
    if (user.nick === nick) {
      return alert("기존 닉네임과 같습니다");
    }

    setIsLoading(true);
    const res = await changeNick(nick);
    if (res.data.success) {
      alert(res.data.message);
      setIsLoading(false);
      return history.push("/mypage");
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
  const onClickCancelNick = () => {
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
      setIsLoading(true);
      dispatch(changePassword(password)).then((res) => {
        if (res.data.success) {
          localStorage.removeItem("access");
          alert(res.data.message);
          return history.push("/login");
        }
        if (res.status === 400) {
          alert(res.data.message);
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
        const message = window.prompt('"회원탈퇴"를 입력해주세요.');
        if (message === "회원탈퇴") {
          dispatch(resignUser(user._id)).then((res) => {
            if (res.data.success) {
              alert(res.data.message);
              localStorage.removeItem("access");
              return history.push("/");
            }
            return history.push({
              pathname: "/error",
              state: {
                status: res.status,
                message: res.data.message,
                text: res.statusText,
              },
            });
          });
        } else {
          return alert('"회원탈퇴"를 입력해주세요.');
        }
      } else {
        dispatch(resignOAuthUser()).then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            return history.push("/");
          }
          return history.push({
            pathname: "/error",
            state: {
              status: res.status,
              message: res.data.message,
              text: res.statusText,
            },
          });
        });
      }
    }
  };

  return isLoading ? (
    <LoadingComponent />
  ) : (
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
