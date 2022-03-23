import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "20px",
  },
  text: {
    marginBottom: "20px",
  },
  buttonArea: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function CreateComponent({ input, onChangeInput, onCreateHandler }) {
  const classes = useStyles();
  const { title, text } = input;
  return (
    <form onSubmit={onCreateHandler}>
      <Box>
        <TextField
          className={classes.title}
          onChange={onChangeInput}
          variant="outlined"
          placeholder="제목을 입력하세요"
          required
          fullWidth
          name="title"
          value={title}
        />
        <TextField
          className={classes.text}
          variant="outlined"
          onChange={onChangeInput}
          placeholder="내용을 입력하세요"
          rows="30"
          fullWidth
          multiline={true}
          required
          value={text}
          name="text"
        />
      </Box>
      <Box className={classes.buttonArea}>
        <Button variant="contained" type="submit">
          작성
        </Button>
      </Box>
    </form>
  );
}

export default CreateComponent;
