import React, { memo } from "react";
import Info from "./section/Info";
import Motto from "./section/Motto";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  title: {
    margin: "16px 0",
    fontWeight: "bold",
  },
}));

function MyPageComponent({
  onChangeImage,
  onClickDeleteImage,
  path,
  user,
  motto,
  toggle,
  onChangeMotto,
  onSubmitMotto,
}) {
  const classes = useStyles();
  document.title = "내 정보";

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        내 정보
      </Typography>
      <Info
        onChangeImage={onChangeImage}
        onClickDeleteImage={onClickDeleteImage}
        path={path}
        user={user}
      />
      <Motto
        motto={motto}
        user={user}
        onChangeMotto={onChangeMotto}
        onSubmitMotto={onSubmitMotto}
        toggle={toggle}
      />
    </>
  );
}

export default memo(MyPageComponent);
