import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      flexDirection: "column",
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
  };
});

function MyPage({ categories }) {
  const classes = useStyles();

  return (
    <Box className={classes.area}>
      {categories.map((category, i) => (
        <Link className={classes.link} key={i} to={category.link}>
          {category.tag}
        </Link>
      ))}
    </Box>
  );
}

export default MyPage;
