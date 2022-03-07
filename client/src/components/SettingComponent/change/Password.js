import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { changePassword } from "../../../actions/UserAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  AUTH_ERROR,
  SERVER_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_ERROR,
} from "../../../actions/type";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "16px 0",
    fontWeight: "bold",
  },
  password: {
    marginBottom: "32px",
  },
  btnArea: {
    marginTop: "50px",
    display: "flex",
    justifyContent: "space-around",
  },
  msg: {
    textAlign: "center",
    margin: "450px 0",
    fontSize: "3rem",
  },
}));

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

function Password() {
  const user = useSelector((state) => state.UserReducer.user);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const onSubmitChange = (e) => {
    e.preventDefault();
    if (checkPassword(password)) {
      if (password !== confirm) {
        return alert("비밀번호를 확인해주세요");
      }
      dispatch(changePassword(password)).then((res) => {
        if (res.type === UPDATE_PASSWORD) {
          alert(res.data.message);
          return history.push("/setting");
        }
        if (res.type === UPDATE_PASSWORD_ERROR) {
          return alert(res.data.message);
        }
        if (res.type === AUTH_ERROR) {
          alert(res.data.message);
          return history.push("/login");
        }
        if (res.type === SERVER_ERROR) {
          return history.push("/error/500");
        }
      });
    } else {
      return alert(
        "비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다"
      );
    }
  };
  const onClickCancel = () => {
    return history.push("/setting");
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePasswordConfirm = (e) => {
    setConfirm(e.target.value);
  };
  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        비밀번호 변경
      </Typography>
      {user.provider === "local" ? (
        <form onSubmit={onSubmitChange}>
          <Box>
            <TextField
              className={classes.password}
              type="password"
              variant="outlined"
              onChange={onChangePassword}
              placeholder="변경할 비밀번호를 입력하세요"
              required
              autoComplete="false"
              fullWidth
            />
            <TextField
              type="password"
              variant="outlined"
              onChange={onChangePasswordConfirm}
              placeholder="비밀번호를 한번 더 입력하세요"
              required
              autoComplete="false"
              fullWidth
            />
          </Box>
          <Box className={classes.btnArea}>
            <Button type="submit" variant="outlined">
              변경
            </Button>
            <Button variant="outlined" onClick={onClickCancel}>
              취소
            </Button>
          </Box>
        </form>
      ) : (
        <Box className={classes.msg}>
          비밀번호 변경이 가능한 아이디가 아닙니다.
        </Box>
      )}
    </Box>
  );
}

export default Password;
