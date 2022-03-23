import React from "react";
import { Button, TextField, Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login: {
    textDecoration: "none",
    color: "#757575",
    "&:hover": {
      textDecoration: "underline",
      color: "#ababab",
    },
  },
}));

function Form({ input, onSubmitRegister, onChangeInput, emailRef }) {
  const classes = useStyles();
  const { email, password, username, nick } = input;
  return (
    <Box>
      <form className={classes.form} onSubmit={onSubmitRegister}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="email"
              label="이메일"
              name="email"
              onChange={onChangeInput}
              autoFocus
              value={email}
              inputRef={emailRef}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              onChange={onChangeInput}
              value={password}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined" //네모칸 만들기
              required
              fullWidth
              label="이름"
              name="username" //querystring값
              autoComplete="username"
              onChange={onChangeInput}
              value={username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              required
              label="닉네임"
              name="nick"
              autoComplete="nick"
              onChange={onChangeInput}
              value={nick}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          회원가입
        </Button>
      </form>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to="/login" className={classes.login}>
            로그인
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
