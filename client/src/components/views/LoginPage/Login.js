import React, { useEffect } from "react";
import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Footer/section/Copyright";
import { loadCSS } from "fg-loadcss";
import Title from "./section/Title";
// import Form from './section/Form';
import FormEx from "./section/FormEx";
import OAuth from "./section/OAuth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  copyright: {
    textAlign: "center",
  },
}));

function Login() {
  const classes = useStyles();

  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper}>
        <Title />
        {/* <Form /> */}
        <FormEx />
      </Box>
      <OAuth />
      <Box className={classes.copyright} mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
