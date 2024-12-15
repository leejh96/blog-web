import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#757575",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
function Copyright() {
  const classes = useStyles();
  return (
    <Typography component={"span"} variant="body2" color="textSecondary">
      {"Copyright © "}
      <a
        className={classes.link}
        target="blank"
        href="https://github.com/leejh96"
      >
        JULOG
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
