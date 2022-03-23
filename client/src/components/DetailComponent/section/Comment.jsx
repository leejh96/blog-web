import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: "10px",
    },
    text: {
      width: "90%",
    },
  };
});

function Comment({ text, onChangeText, onClickCreateComment }) {
  const classes = useStyles();

  return (
    <Box className={classes.area}>
      <TextField
        value={text}
        className={classes.text}
        multiline={true}
        placeholder="댓글을 남겨보세요"
        onChange={onChangeText}
        variant="outlined"
        id="comment"
      />
      <Button size="small" variant="contained" onClick={onClickCreateComment}>
        등록
      </Button>
    </Box>
  );
}

export default Comment;
