import React from "react";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      justifyContent: "space-evenly",
      marginBottom: "40px",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
  };
});

function UpdateAndDeleteBtn({ postId, onClickDeleteNotice }) {
  const classes = useStyles();

  return (
    <Box className={classes.area}>
      <Link className={classes.link} to={`/notice/${postId}/edit`}>
        <Button variant="outlined">수정</Button>
      </Link>
      <Button variant="outlined" onClick={onClickDeleteNotice(postId)}>
        삭제
      </Button>
    </Box>
  );
}

export default UpdateAndDeleteBtn;
