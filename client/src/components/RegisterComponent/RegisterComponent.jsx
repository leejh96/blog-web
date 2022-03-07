import React from "react";
import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../FooterComponent/section/Copyright";
import Form from "./section/Form";

import Title from "./section/Title";

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

function RegisterComponent({
  input,
  onSubmitRegister,
  onChangeInput,
  emailRef,
}) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper}>
        <Title />
        <Form
          input={input}
          onSubmitRegister={onSubmitRegister}
          onChangeInput={onChangeInput}
          emailRef={emailRef}
        />
      </Box>
      <Box className={classes.copyright} mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default RegisterComponent;
