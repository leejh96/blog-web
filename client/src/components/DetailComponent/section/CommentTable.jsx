import React from "react";
import { Button, Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TimeComponent from "../../../util/time";
const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    commentArea: {
      width: "70%",
      border: "1px solid #c4c4c4",
      borderRadius: "3px",
      marginBottom: "20px",
    },
    user: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #c4c4c4",
      backgroundColor: "#f6f8fa",
      color: "#5e666f",
      padding: "10px 20px",
    },
    info: {
      display: "flex",
      alignItems: "center",
    },
    deleteBtn: {
      lineHeight: 0,
      minWidth: 0,
    },
    dateDelete: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    comment: {
      padding: "10px 20px",
      wordBreak: "break-all",
    },
    img: {
      marginRight: "10px",
      width: "5%",
    },
  };
});

function CommentTable({ notice, user, onClickDeleteComment }) {
  const classes = useStyles();
  const comments = notice.comment || [];
  return (
    <Container disableGutters className={classes.area}>
      {comments.map((comment) => (
        <Box className={classes.commentArea} key={comment._id}>
          <Box className={classes.user}>
            <Box className={classes.info}>
              {comment.user ? (
                <img
                  className={classes.img}
                  src={comment.user.img}
                  alt="userImg"
                />
              ) : null}
              {comment.user ? comment.user.nick : "알수없음"}
            </Box>
            <Box className={classes.dateDelete}>
              <Box align="center">
                <TimeComponent date={comment.date} />
              </Box>
              {comment.user ? (
                user._id === comment.user._id || user.role === 3 ? (
                  <Button
                    className={classes.deleteBtn}
                    onClick={() => onClickDeleteComment(comment._id)}
                  >
                    X
                  </Button>
                ) : null
              ) : user.role === 3 ? (
                <Button
                  className={classes.deleteBtn}
                  onClick={() => onClickDeleteComment(comment._id)}
                >
                  X
                </Button>
              ) : null}
            </Box>
          </Box>
          <Box className={classes.comment}>
            {comment.comment.split("\n").map((value, index) => (
              <span key={index}>
                {value}
                <br />
              </span>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
}

export default CommentTable;
