import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete, Create } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      flexDirection: "column",
    },
    link: {
      textDecoration: "none",
      marginBottom: "3px",
      color: "black",
      "&:hover": {
        color: "#999999",
        textDecoration: "underline",
      },
    },
    title: {
      margin: 0,
      fontWeight: "bold",
      fontSize: "0.9rem",
    },
    titleDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 0 10px 0",
      padding: 0,
    },
    plusBtn: {
      padding: 0,
      margin: 0,
      border: 0,
    },
    plusField: {
      marginBottom: "10px",
      display: "flex",
      justifyContent: "space-evenly",
      padding: "0 3rem",
    },
    deleteBtn: {
      padding: 0,
      margin: 0,
      border: 0,
    },
    text: {
      padding: "0",
      margin: "0",
      width: "50%",
    },
    createBtn: {
      padding: "0 2px",
      margin: 0,
    },
    studyDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
function Study({
  onClickDeleteStudy,
  onClickCreateStudy,
  onClickPlusBtn,
  onChangeText,
  user,
  studies,
  createToggle,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <Box className={classes.titleDiv}>
        <Typography className={classes.title}>Study</Typography>
        {user.role === 3 ? (
          <IconButton size="small" onClick={onClickPlusBtn}>
            <Create />
          </IconButton>
        ) : null}
      </Box>
      {createToggle ? (
        <Box className={classes.plusField}>
          <TextField
            size="small"
            variant="outlined"
            className={classes.text}
            onChange={onChangeText}
            placeholder="추가항목 입력"
          />
          <Button
            size="small"
            variant="outlined"
            className={classes.createBtn}
            onClick={onClickCreateStudy}
          >
            추가
          </Button>
        </Box>
      ) : null}
      {studies.map((val, i) => (
        <Box className={classes.studyDiv} key={val._id}>
          <Link to={val.link} className={classes.link}>
            {val.subject}
          </Link>
          {user.role === 3 ? (
            <IconButton
              size="small"
              onClick={() => onClickDeleteStudy(val._id)}
            >
              <Delete />
            </IconButton>
          ) : null}
        </Box>
      ))}
    </Box>
  );
}

export default Study;
