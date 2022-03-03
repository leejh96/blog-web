import React from "react";
import CreateComponent from "./section/CreateComponent";
import UpdateComponent from "./section/UpdateComponent";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingComponent from "../../LoadingPage/Loading";

const useStyles = makeStyles((theme) => ({
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
}));

function NoticeEditComponent({
  load,
  postId,
  title,
  text,
  onCreateHandler,
  onUpdateHandler,
  onChangeTitle,
  onChangeText,
}) {
  const classes = useStyles();
  return (
    <>
      {load ? (
        <LoadingComponent />
      ) : (
        <>
          {!postId ? (
            <Box>
              <Typography variant="h5" className={classes.title}>
                공지사항 작성
              </Typography>
              <Box className={classes.area}>
                <CreateComponent
                  onCreateHandler={onCreateHandler}
                  onChangeTitle={onChangeTitle}
                  onChangeText={onChangeText}
                />
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h5" className={classes.title}>
                공지사항 수정
              </Typography>
              <Box className={classes.area}>
                <UpdateComponent
                  onUpdatehandler={onUpdateHandler}
                  onChangeTitle={onChangeTitle}
                  onChangeText={onChangeText}
                  title={title}
                  text={text}
                />
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}

export default NoticeEditComponent;
