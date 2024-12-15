import React from "react";
import { Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Google } from "@mui/icons-material";
const useStyles = makeStyles((theme) => ({
  oauth: {
    display: "flex",
    justifyContent: "center",
  },
}));

function OAuth() {
  const classes = useStyles();
  return (
    <Box className={classes.oauth} mt={2}>
      <IconButton href="https://julogpage.herokuapp.com/api/auth/google">
        <Google />
      </IconButton>
    </Box>
  );
}

export default OAuth;
