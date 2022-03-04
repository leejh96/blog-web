import React from "react";
import { Button, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  area: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  deleteButton: {
    height: "100%",
    minWidth: 0,
    color: "#5e669c",
    lineHeight: 0,
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
  dateBtn: {
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
});

function CommentTable({ onClickDelete, comment, user, study }) {
  const classes = useStyles();
  return (
    <Container disableGutters className={classes.area}>
      {comment.map((val) => (
        <Box className={classes.commentArea} key={val._id}>
          <Box className={classes.user}>
            <Box className={classes.info}>
              {val.user ? (
                <img className={classes.img} src={val.user.img} alt="userImg" />
              ) : null}
              {val.user ? val.user.nick : "알수없음"}
            </Box>
            <Box className={classes.dateBtn}>
              <Box align="center">{val.date}</Box>
              <Box align="center">
                {val.user ? (
                  user._id === val.user._id || user.role === 3 ? (
                    <Button
                      className={classes.deleteButton}
                      onClick={onClickDelete(val._id, study)}
                    >
                      X
                    </Button>
                  ) : null
                ) : user.role === 3 ? (
                  <Button
                    className={classes.deleteButton}
                    onClick={onClickDelete(val._id, study)}
                  >
                    X
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>
          <Box className={classes.comment}>
            {val.comment.split("\n").map((value, index) => (
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
