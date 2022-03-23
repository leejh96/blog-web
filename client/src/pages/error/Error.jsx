import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

function Error() {
  const location = useLocation();
  const { text, status, message } = location.state || {};
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.area}>
      <Typography variant="h5">
        {text}({status})
      </Typography>
      <Typography variant="h2">{message}</Typography>
      <Box className={classes.btnArea}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          홈으로
        </Button>
      </Box>
    </Box>
  );
}

export default Error;
