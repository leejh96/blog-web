import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function Resign({ onClickResign }) {
  const classes = useStyles();
  document.title = "회원탈퇴";

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
        <Button variant="outlined" onClick={onClickResign}>
          탈퇴하기
        </Button>
      </Box>
    </Box>
  );
}

export default Resign;
