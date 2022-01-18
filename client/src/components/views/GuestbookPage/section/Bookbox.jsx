import React from "react";
import { Button, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  area: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "10px",
  },
  text: {
    width: "90%",
  },
}));

function Bookbox({ onClickCreateBtn, onChangeText }) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <TextField
        autoFocus
        className={classes.text}
        placeholder="방명록을 남겨보세요."
        onChange={onChangeText}
        variant="outlined"
      />
      <Button variant="contained" onClick={onClickCreateBtn}>
        등록
      </Button>
    </Box>
  );
}

export default Bookbox;
