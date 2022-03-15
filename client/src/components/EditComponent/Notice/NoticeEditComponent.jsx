import React from "react";
import CreateComponent from "./section/CreateComponent";
import UpdateComponent from "./section/UpdateComponent";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  postId,
  input,
  onCreateHandler,
  onUpdateHandler,
  onChangeInput,
}) {
  const classes = useStyles();
  return (
    <>
      {!postId ? (
        <Box>
          <Typography variant="h5" className={classes.title}>
            공지사항 작성
          </Typography>
          <Box className={classes.area}>
            <CreateComponent
              onCreateHandler={onCreateHandler}
              onChangeInput={onChangeInput}
              input={input}
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
              onUpdateHandler={onUpdateHandler}
              onChangeInput={onChangeInput}
              input={input}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default NoticeEditComponent;
