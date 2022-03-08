import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signup: {
    textDecoration: "none",
    color: "#757575",
    "&:hover": {
      textDecoration: "underline",
      color: "#ababab",
    },
  },
}));

function Form({ email, password, onChangeInput, onSubmitInfo, emailRef }) {
  const classes = useStyles();
  return (
    <Box>
      <form className={classes.form} onSubmit={onSubmitInfo}>
        <TextField
          required
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          label="이메일"
          name="email"
          autoFocus
          onChange={onChangeInput}
          value={email}
          inputRef={emailRef}
        />
        <TextField
          required
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="비밀번호"
          type="password"
          onChange={onChangeInput}
          value={password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          로그인
        </Button>
      </form>
      <Grid container style={{ justifyContent: "space-between" }}>
        <Grid item>
          <Link to="/signup" className={classes.signup}>
            회원가입
          </Link>
        </Grid>
        <Grid item>
          <Link to="/find" className={classes.signup}>
            비밀번호 찾기
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
