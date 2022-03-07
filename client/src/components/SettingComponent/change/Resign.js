import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { resignUser, resignOAuthUser } from "../../../actions/UserAction";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AUTH_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  SERVER_ERROR,
} from "../../../actions/type";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "16px 0",
    fontWeight: "bold",
  },
  area: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    fontSize: "2rem",
  },
  textArea: {
    textAlign: "center",
    marginBottom: "32px",
  },
}));

function Resign() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.UserReducer.user);
  const onClickBtn = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      if (user.provider === "local") {
        const password = window.prompt(
          "탈퇴를 위한 아이디의 비밀번호를 입력해주시기 바랍니다."
        );
        dispatch(resignUser(password)).then((res) => {
          if (res.type === DELETE_USER) {
            alert(res.data.message);
            localStorage.removeItem("access");
            return history.push("/");
          }
          if (res.type === DELETE_USER_ERROR) {
            return alert(res.data.message);
          }
          if (res.type === AUTH_ERROR) {
            alert(res.data.message);
            return history.push("/login");
          }
          if (res.type === SERVER_ERROR) {
            history.push("/error/500");
          }
        });
      } else {
        dispatch(resignOAuthUser()).then((res) => {
          if (res.type === DELETE_USER) {
            alert(res.data.message);
            return history.push("/");
          }
          if (res.type === DELETE_USER_ERROR) {
            return alert(res.data.message);
          }
          if (res.type === SERVER_ERROR) {
            return history.push("/error/500");
          }
        });
      }
    }
  };
  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        회원 탈퇴
      </Typography>
      <Box className={classes.area}>
        <Box className={classes.textArea}>
          <Typography className={classes.text} variant="body1">
            그 동안 이용해주셔서 감사합니다.
            <br />
            좋은 하루 보내시길 바랍니다.
          </Typography>
        </Box>
        <Button variant="outlined" onClick={onClickBtn}>
          탈퇴하기
        </Button>
      </Box>
    </Box>
  );
}

export default Resign;
