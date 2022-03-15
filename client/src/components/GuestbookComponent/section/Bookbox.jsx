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

function Bookbox({ onSubmitCreate, onChangeText }) {
  const classes = useStyles();
  return (
    <form className={classes.area} onSubmit={onSubmitCreate}>
      <TextField
        autoFocus
        className={classes.text}
        placeholder="방명록을 남겨보세요."
        onChange={onChangeText}
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        등록
      </Button>
    </form>
  );
}

export default Bookbox;
