import React from "react";
import LikeButton from "./section/LikeButton";
import TextArea from "./section/TextArea";
import Comment from "./section/Comment";
import CommentTable from "./section/CommentTable";
import UpdateAndDeleteBtn from "./section/UpdateAndDeleteBtn";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography } from "@material-ui/core";
import Loading from "../LoadingPage/Loading";
const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      flexDirection: "column",
      marginTop: "10px",
      paddingBottom: "10px",
      justifyContent: "space-around",
    },
    title: {
      margin: "16px 0",
      fontWeight: "bold",
    },
  };
});

function DetailComponent({
  notice,
  user,
  load,
  toggle,
  cnt,
  postId,
  comments,
  onClickDeleteNotice,
  onClickLike,
  onClickDeleteComment,
  onChangeText,
  onClickCreateComment,
}) {
  const classes = useStyles();
  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <Box>
          <Typography variant="h5" className={classes.title}>
            공지사항
          </Typography>
          <Container className={classes.area} disableGutters>
            <TextArea notice={notice} />
            {user.role === 3 ? (
              <UpdateAndDeleteBtn
                postId={postId}
                onClickDeleteNotice={onClickDeleteNotice}
              />
            ) : null}
            <LikeButton toggle={toggle} cnt={cnt} onClickLike={onClickLike} />
            <CommentTable
              user={user}
              comments={comments}
              onClickDeleteComment={onClickDeleteComment}
            />
            <Comment
              onChangeText={onChangeText}
              onClickCreateComment={onClickCreateComment}
            />
          </Container>
        </Box>
      )}
    </>
  );
}
export default DetailComponent;
