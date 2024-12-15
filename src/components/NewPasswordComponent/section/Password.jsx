import React from "react";
import { Box, SvgIcon, Typography, Button, TextField } from "@material-ui/core";
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

function Password({ onChangeInput, onSubmitData, onClickClose, input }) {
  const classes = useStyles();
  const { password, confirm } = input;
  return (
    <>
      <Box className={classes.title}>
        <SvgIcon className={classes.icon}>
          <AccountCircleIcon />
        </SvgIcon>
        <Typography variant="h4">새로운 비밀번호</Typography>
      </Box>
      <form onSubmit={onSubmitData} className={classes.form}>
        <Box className={classes.input}>
          <TextField
            type="password"
            name="password"
            onChange={onChangeInput}
            className={classes.text}
            fullWidth
            label="비밀번호"
            variant="outlined"
            autoComplete="off"
            value={password}
            required
          />
          <TextField
            type="password"
            name="confirm"
            onChange={onChangeInput}
            fullWidth
            label="비밀번호 확인"
            variant="outlined"
            required
            autoComplete="off"
            value={confirm}
          />
        </Box>
        <Box className={classes.btnArea}>
          <Button type="submit" color="primary" variant="contained">
            변경
          </Button>
          <Button onClick={onClickClose} variant="outlined">
            닫기
          </Button>
        </Box>
      </form>
    </>
  );
}

export default Password;
