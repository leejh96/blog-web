import React from "react";
import { Button, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  area: {
    display: "flex",
    height: "400px",
    marginBottom: "36px",
    width: "100%",
  },
  imgBtn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "40%",
    height: "400px",
  },
  infoArea: {
    width: "60%",
    boxSizing: "border-box",
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0 20px",
  },
  text: {
    paddingLeft: "10px",
    marginBottom: "5px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#999999",
  },
  textBox: {
    display: "flex",
    boxSizing: "border-box",
    border: "1px solid #c4c4c4",
    borderRadius: "5px",
    height: "50px",
    padding: "10px 10px",
    alignItems: "center",
  },
  upload: {
    display: "none",
  },
  label: {
    padding: "6px 24px",
    backgroundColor: "#c4c4c4",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    marginRight: "4px",
    "&:hover": {
      backgroundColor: "#b4b4b4",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "6px 8px",
    },
  },
  btnArea: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  imageArea: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "80%",
    boxSizing: "border-box",
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      padding: "6px 6px",
    },
  },
}));
function Info({ onChangeImage, onClickDeleteImage, path, user }) {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.area}>
      <Box className={classes.imgBtn}>
        <Box className={classes.imageArea}>
          <img src={path} alt="이미지" width="100%" height="100%" />
        </Box>
        <form>
          <Box className={classes.btnArea}>
            <label className={classes.label} htmlFor="input-file" id="label">
              업로드
            </label>
            <input
              className={classes.upload}
              type="file"
              name="file"
              id="input-file"
              onChange={onChangeImage}
            />
            <Button
              className={classes.btn}
              variant="outlined"
              onClick={onClickDeleteImage}
            >
              이미지 제거
            </Button>
          </Box>
        </form>
      </Box>
      <Box className={classes.infoArea}>
        <Box className={classes.text}>이름</Box>
        <Box className={classes.textBox}>{user.username}</Box>
        <Box className={classes.text}>닉네임</Box>
        <Box className={classes.textBox}>{user.nick}</Box>
        <Box className={classes.text}>이메일</Box>
        <Box className={classes.textBox}>{user.email}</Box>
        <Box className={classes.text}>등급</Box>
        <Box className={classes.textBox}>
          {user.role === 3 ? "관리자" : "일반회원"}
        </Box>
      </Box>
    </Container>
  );
}

export default Info;
