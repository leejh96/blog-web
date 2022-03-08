import React from "react";
import Info from "./section/Info";
import Motto from "./section/Motto";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "16px 0",
    fontWeight: "bold",
  },
}));

function MyPageComponent({ onChangeImage, onClickDeleteImage, path, user }) {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h5" className={classes.title}>
        내 정보
      </Typography>
      <Info
        onChangeImage={onChangeImage}
        onClickDeleteImage={onClickDeleteImage}
        path={path}
        user={user}
      />
      <Motto />
    </Box>
  );
}

export default MyPageComponent;
