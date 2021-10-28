import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      textAlign: "right",
    },
  };
});

function AuthWrap({ children }) {
  const classes = useStyles();

  return <Box className={classes.area}>{children}</Box>;
}

export default AuthWrap;
