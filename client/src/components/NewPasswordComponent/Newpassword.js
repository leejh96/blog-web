import React from "react";
import Password from "./section/Password";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  area: {
    paddingTop: "8%",
    paddingBottom: "8%",
  },
}));

function Newpassword() {
  const classes = useStyles();
  return (
    <Container className={classes.area} maxWidth="xs" disableGutters>
      <Password />
    </Container>
  );
}

export default Newpassword;
