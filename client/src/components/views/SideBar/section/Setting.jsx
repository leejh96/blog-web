import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      flexDirection: "column",
      padding: "10px 10px 0 30px",
    },
    link: {
      textDecoration: "none",
      marginBottom: "3px",
      color: "black",
      "&:hover": {
        color: "#999999",
        textDecoration: "underline",
      },
    },
    title: {
      margin: 0,
      fontWeight: "bold",
      fontSize: "1rem",
    },
    titleDiv: {
      display: "flex",
      justifyContent: "space-between",
      margin: "0 0 10px 0",
      padding: 0,
    },
  };
});

function Setting({ settingList }) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <Box className={classes.titleDiv}>
        <Typography variant="h4" className={classes.title}>
          목록
        </Typography>
      </Box>
      {settingList.map((val, i) => (
        <Link className={classes.link} key={i} to={val.link}>
          {val.tag}
        </Link>
      ))}
    </Box>
  );
}

export default Setting;
