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
      fontSize: "0.5rem",
    },
  };
});

function AuthT({ onList, onClickLogout }) {
  const classes = useStyles();

  return (
    <Box className={classes.area}>
      {onList.map((value, i) =>
        value.tag !== "로그아웃" ? (
          <Link key={i} to={value.link} className={classes.link}>
            {value.tag}
          </Link>
        ) : (
          <Link
            key={i}
            to={value.link}
            onClick={onClickLogout}
            className={classes.link}
          >
            {value.tag}
          </Link>
        )
      )}
    </Box>
  );
}

export default AuthT;
