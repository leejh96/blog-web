import { Button, TextField, Box } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { createGuestBook } from "../../../../actions/GuestbookAction";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AUTH_ERROR,
  CREATE_GUESTBOOK,
  CREATE_GUESTBOOK_ERROR,
  SERVER_ERROR,
} from "../../../../actions/type";

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

function Bookbox() {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      <TextField
        className={classes.text}
        inputRef={textRef}
        placeholder="방명록을 남겨보세요."
        autoFocus
        onChange={onChangeText}
        variant="outlined"
        value={text}
      />
      <Button variant="contained" onClick={onClickBtn}>
        등록
      </Button>
    </Box>
  );
}

export default Bookbox;
