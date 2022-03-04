import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  area: { display: "flex", width: "100%" },
  back: {
    fontSize: "5rem",
    textDecoration: "none",
    color: "grey",
  },
  logo: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "100px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));
function Title() {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <Link className={classes.back} to="/">
        {"<"}
      </Link>
      <Box className={classes.logo}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
      </Box>
    </Box>
  );
}

export default Title;
