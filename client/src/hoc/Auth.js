import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authUser } from "../actions/UserAction";
import getCookie from "../util/getCookie";
function Auth(Component, option, adminRoute = null) {
  //component => hoc를 적용할 컴포넌트
  //option => null: 아무나 출입,
  //          true => 로그인유저만 출입,
  //          false => 로그인 한 유저는 출입불가
  //adminRoute => true : admin User만 출입
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => state.UserReducer);
    useEffect(() => {
      const access = localStorage.getItem("access");
      const OauthCookie = getCookie(document.cookie).find(
        (cookie) => cookie.key === "oauth"
      );

      if (access) {
        dispatch(authUser()).then((res) => {
          if (res.data.success) {
            localStorage.setItem("access", res.data.token);
            if (option === false) {
              alert("로그인 한 유저는 접근이 제한됩니다.");
              return history.push("/");
            }
            if (adminRoute && user.role !== 3) {
              alert("해당 유저는 접근할 수 없습니다.");
              return history.push("/");
            }
          } else {
            if (res.status === 401) {
              alert(res.data.message);
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
          }
        });
      }

      if (OauthCookie) {
        dispatch(authUser()).then((res) => {
          if (res.data.success) {
            if (option === false) {
              alert("로그인 한 유저는 접근이 제한됩니다.");
              return history.push("/");
            }
            if (adminRoute && user.role !== 3) {
              alert("해당 유저는 접근할 수 없습니다.");
              return history.push("/");
            }
          } else {
            if (res.status === 401) {
              alert(res.data.message);
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
          }
        });
      }
      if (!access && !OauthCookie) {
        if (option === true) {
          alert("로그인이 필요합니다.");
          history.push("/login");
        }
      }
    }, []);
    return <Component />;
  }
  return AuthenticationCheck;
}

export default Auth;
