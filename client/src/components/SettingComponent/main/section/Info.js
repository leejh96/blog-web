import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "../../../../actions/UserAction";
import { Button, Container, Box } from "@material-ui/core";
import { deleteImg } from "../../../../actions/UserAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  AUTH_ERROR,
  SERVER_ERROR,
  UPDATE_IMAGE,
  UPDATE_IMAGE_ERROR,
} from "../../../../actions/type";
import { useHistory } from "react-router-dom";

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
function Info() {
  const classes = useStyles();
  const [path, setPath] = useState("");
  const user = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setPath(user.img);
  }, [user]);
  const onChangeImage = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    dispatch(uploadImage(formData)).then((res) => {
      if (res.type === UPDATE_IMAGE) {
        return setPath(res.data.file);
      }
      if (res.type === UPDATE_IMAGE_ERROR) {
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
  };

  const onClickDelete = () => {
    if (
      user.img ===
      "https://julog-app.s3.ap-northeast-2.amazonaws.com/uploads/basic.png"
    ) {
      return;
    }
    dispatch(deleteImg(user.img)).then((res) => {
      if (res.data.success) {
        return setPath(res.data.img);
      }
      return alert(res.data.message);
    });
  };
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
              onClick={onClickDelete}
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
