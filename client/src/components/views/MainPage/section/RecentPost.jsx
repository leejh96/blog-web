import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      padding: "30px 0 30px 0",
      align: "center",
      borderBottom: "1px solid #eeeeee",
    },
    post: {
      display: "flex",
      alignItems: "center",
      padding: "12px",
      fontSize: "1.25rem",
    },
    postLink: {
      margin: "0 auto",
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "#999999",
      },
    },
  };
});

function RecentPost({ title, posts }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h5" align="center" className={classes.title}>
        {title}
      </Typography>
      {posts.map((val, i) => (
        <Box className={classes.post} key={i}>
          <Box className={classes.number}>{i + 1}</Box>
          <Link className={classes.postLink} to={val.link}>
            {val.subject}
          </Link>
        </Box>
      ))}
    </>
  );
}

export default RecentPost;
