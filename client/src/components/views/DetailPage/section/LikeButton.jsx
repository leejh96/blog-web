import React from "react";
import { Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useStyles = makeStyles((theme) => {
  return {
    area: {
      marginBottom: "20px",
      textAlign: "center",
    },
    onToggle: {
      "&:hover": {
        backgroundColor: "#87cefa",
      },
    },
    icon: {
      marginRight: "10px",
    },
  };
});

function LikeButton({ toggle, cnt, onClickLike }) {
  const classes = useStyles();
  return (
    <Box className={classes.area}>
      {toggle ? (
        <IconButton
          color="primary"
          className={classes.onToggle}
          variant="contained"
          onClick={onClickLike}
        >
          <ThumbUpIcon className={classes.icon} />
          {`${cnt}`}
        </IconButton>
      ) : (
        <IconButton variant="contained" onClick={onClickLike}>
          <ThumbUpIcon className={classes.icon} />
          {`${cnt}`}
        </IconButton>
      )}
    </Box>
  );
}

export default LikeButton;
