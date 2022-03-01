import React from "react";
import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "../Footer/section/Copyright";
// import Form from './section/Form';
import FormEx from "./section/FormEx";

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

function Signup() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper}>
        <Title />
        {/* <Form /> */}
        <FormEx />
      </Box>
      <Box className={classes.copyright} mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default Signup;
