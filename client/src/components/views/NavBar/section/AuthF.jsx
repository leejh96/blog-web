import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      textAlign: "right",
    },
    link: {
      textDecoration: "none",
      color: "black",
      marginRight: "5px",
      fontSize: "6px",
    },
  };
});
function AuthF({ offList }) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      {offList.map((value, i) => (
        <Link key={i} to={value.link} className={classes.link}>
          {value.tag}
        </Link>
      ))}
    </Box>
  );
}

export default AuthF;
