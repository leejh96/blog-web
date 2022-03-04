import React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStlyes = makeStyles((theme) => ({
  area: {
    display: "flex",
    widht: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "black",
    color: "white",
  },
  btnArea: {
    marginTop: "24px",
    display: "flex",
    width: "50%",
    justifyContent: "space-evenly",
  },
}));

function ServerError() {
  const classes = useStlyes();
  const history = useHistory();
  const onClickHome = () => {
    history.push("/");
  };
  const onClickBack = () => {
    history.goBack();
  };
  return (
    <Box className={classes.area}>
      <Typography variant="h5">예측하지 못한 에러(500)</Typography>
      <Typography variant="h2">서버에 에러가 발생했습니다</Typography>
      <Box className={classes.btnArea}>
        <Button variant="contained" color="primary" onClick={onClickHome}>
          홈으로
        </Button>
        <Button variant="contained" color="primary" onClick={onClickBack}>
          뒤로가기
        </Button>
      </Box>
    </Box>
  );
}

export default ServerError;
