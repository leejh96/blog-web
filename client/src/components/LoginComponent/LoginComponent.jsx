import React from "react";
import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../FooterComponent/section/Copyright";
import Title from "./section/Title";
import Form from "./section/Form";
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

function Login({ email, password, onChangeInput, onSubmitInfo, emailRef }) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper}>
        <Title />
        <Form
          email={email}
          password={password}
          onChangeInput={onChangeInput}
          onSubmitInfo={onSubmitInfo}
          emailRef={emailRef}
        />
      </Box>
      <OAuth />
      <Box className={classes.copyright} mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
