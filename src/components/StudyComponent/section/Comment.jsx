import React from "react";
import { TextField, Button } from "@material-ui/core";
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

function Comment({ onSubmitCreateComment, onChangeText, text }) {
  const classes = useStyles();
  return (
    <form className={classes.area} onSubmit={onSubmitCreateComment}>
      <TextField
        className={classes.text}
        multiline={true}
        placeholder="댓글을 남겨보세요."
        onChange={onChangeText}
        variant="outlined"
        value={text}
      />
      <Button variant="contained" type="submit">
        등록
      </Button>
    </form>
  );
}

export default Comment;
