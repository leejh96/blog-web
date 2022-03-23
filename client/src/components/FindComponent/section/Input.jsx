import React from "react";
import { TextField, Box, Button, Typography, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    fontSize: "48px",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
  },
  input: {
    marginBottom: "24px",
  },
  text: {
    paddingBottom: "12px",
  },
  btnArea: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function Input({
  onSubmitData,
  onChangeInput,
  onClickClose,
  email,
  username,
  emailRef,
}) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.title}>
        <SvgIcon className={classes.icon}>
          <AccountCircleIcon />
        </SvgIcon>
        <Typography variant="h4">비밀번호 찾기</Typography>
      </Box>
      <form onSubmit={onSubmitData} className={classes.form}>
        <Box className={classes.input}>
          <TextField
            type="email"
            name="email"
            onChange={onChangeInput}
            className={classes.text}
            fullWidth
            label="이메일"
            variant="outlined"
            required
            value={email}
            inputRef={emailRef}
            autoFocus
          />
          <TextField
            name="username"
            onChange={onChangeInput}
            fullWidth
            label="이름"
            variant="outlined"
            required
            value={username}
          />
        </Box>
        <Box className={classes.btnArea}>
          <Button type="submit" color="primary" variant="contained">
            찾기
          </Button>
          <Button onClick={onClickClose} variant="outlined">
            닫기
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Input;
