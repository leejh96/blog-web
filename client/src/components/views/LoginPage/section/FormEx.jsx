import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, TextField, Grid, Box, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { loginUser } from '../../../../actions/UserAction';
import { useDispatch } from 'react-redux';
import { SERVER_ERROR } from '../../../../actions/type';
const useStyles = makeStyles(theme => ({
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    signup : {
      textDecoration : 'none',
      color : '#757575',
      '&:hover' : {
        textDecoration : 'underline',
        color : '#ababab'
      }
    },
}));

function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState({
        email : '',
        password : '',
    });
    const { email, password} = input;
    const classes = useStyles();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name] : value
        })
    }
    
    const onSubmitInfo = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password))
        .then(res => {
            if(res.data.success){
                localStorage.setItem('access', res.data.accessToken);
                return history.push('/');
            }else{
                if(res.type === SERVER_ERROR){
                    return history.push('/error/500')
                }else{
                    return alert(res.data.message);
                }
            }
        })
    }
    return (
        <Box>
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
                    onChange={onChangeInput}
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
                    onChange={onChangeInput}
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
                <Grid container style={{ justifyContent : 'space-between'}}>
                    <Grid item>
                    <Link to="/signup" className={classes.signup}>
                        회원가입
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/findPassword" className={classes.signup}>
                        비밀번호 찾기
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Form
