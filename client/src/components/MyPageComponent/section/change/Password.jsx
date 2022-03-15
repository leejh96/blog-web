import React from "react";
import { TextField, Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function Password({
  input,
  onSubmitPassword,
  onClickCancelPassword,
  onChangeInput,
  user,
}) {
  const classes = useStyles();
  const { password, confirm } = input;
  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        비밀번호 변경
      </Typography>
      {user.provider === "local" ? (
        <form onSubmit={onSubmitPassword}>
          <Box>
            <TextField
              className={classes.password}
              type="password"
              variant="outlined"
              onChange={onChangeInput}
              placeholder="변경할 비밀번호를 입력하세요"
              required
              autoComplete="false"
              fullWidth
              name="password"
              value={password}
            />
            <TextField
              type="password"
              variant="outlined"
              onChange={onChangeInput}
              placeholder="비밀번호를 한번 더 입력하세요"
              required
              autoComplete="false"
              fullWidth
              name="confirm"
              value={confirm}
            />
          </Box>
          <Box className={classes.btnArea}>
            <Button type="submit" variant="outlined">
              변경
            </Button>
            <Button variant="outlined" onClick={onClickCancelPassword}>
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
