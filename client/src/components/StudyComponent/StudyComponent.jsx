import React from "react";
import Comment from "./section/Comment";
import CommentTable from "./section/CommentTable";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Typography, Fab } from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MarkdownComponent from "../StudyComponent/section/MarkdownComponent";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      width: "100%",
      paddingBottom: "10px",
    },
    title: {
      margin: "16px 0",
      fontWeight: "bold",
    },
    upFab: {
      position: "fixed",
      bottom: "100px",
      right: "30px",
    },
    downFab: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
    },
  };
});

function StudyComponent({
  handleBottom,
  handleTop,
  onClickDeleteComment,
  onSubmitCreateComment,
  onChangeText,
  user,
  study,
  text,
}) {
  const classes = useStyles();
  document.title = study.subject;

  return (
    <Box>
      <Container className={classes.area} disableGutters>
        <MarkdownComponent study={study} user={user} />
        <CommentTable
          onClickDeleteComment={onClickDeleteComment}
          user={user}
          study={study}
        />
        <Comment
          onSubmitCreateComment={onSubmitCreateComment}
          onChangeText={onChangeText}
          text={text}
        />
      </Container>
      <Typography id="bottom"></Typography>
      <Box>
        <Fab className={classes.upFab} onClick={handleTop}>
          <ArrowDropUpIcon />
        </Fab>
        <Fab className={classes.downFab} onClick={handleBottom}>
          <ArrowDropDownIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default StudyComponent;
