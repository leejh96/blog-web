import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel,
     Checkbox, Link, Grid, Box, Container, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './section/Copyright';
import { loginUser } from '../../../actions/UserAction';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }; 

  const onSubmitInfo = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password))
    .then(res => {
      if(res.data.success){
        localStorage.setItem('auth', res.data.user.role);
        return history.push('/');
      }
      return alert(res.data.message);
    })
  }
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <form method='post' className={classes.form} noValidate onSubmit={onSubmitInfo}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChangePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="자동 로그인"
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                회원가입
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default Login;
