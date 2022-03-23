import React from "react";
import { Box, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "16px 0",
    fontWeight: "bold",
  },
  nickArea: {
    boxSizing: "border-box",
    border: "1px solid #c4c4c4",
    height: "60px",
    fontSize: "1.5rem",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "30px",
  },
  btnArea: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "50px",
  },
}));

function Nick({
  nick,
  user,
  onSubmitChangeNick,
  onClickCancelNick,
  onChangeNick,
}) {
  const classes = useStyles();
  document.title = "닉네임 변경";

  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        닉네임 변경
      </Typography>
      <form onSubmit={onSubmitChangeNick}>
        <Box>
          <Box className={classes.nickArea}>{user.nick}</Box>
          <TextField
            fullWidth
            variant="outlined"
            onChange={onChangeNick}
            placeholder="변경할 닉네임을 입력하세요"
            required
            value={nick}
          />
        </Box>
        <Box className={classes.btnArea}>
          <Button type="submit" variant="outlined">
            변경
          </Button>
          <Button variant="outlined" onClick={onClickCancelNick}>
            취소
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Nick;
