import React, { useState, useRef } from 'react';
import { Button, TextField, Grid, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { registerUser } from '../../../../actions/UserAction';
import { SERVER_ERROR } from '../../../../actions/type';
const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    login: {
        textDecoration: 'none',
        color: '#757575',
        '&:hover': {
            textDecoration: 'underline',
            color: '#ababab'
        }
    },
}));

const checkPassword = password => {
    const blank = /\s/
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!blank.test(password)) {
        if (regex.test(password)) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

function Form() {
    const [input, setInput] = useState({
        username: '',
        nick: '',
        email: '',
        password: '',
    })
    const emailRef = useRef(null);
    const { username, email, password, nick } = input
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitSignup = (e) => {
        e.preventDefault();
        if (checkPassword(password)) {
            const data = {
                username, nick, email, password
            }
            dispatch(registerUser(data))
                .then(res => {
                    if (res.data.success) {
                        return history.push('/login');
                    } else {
                        if (res.type === SERVER_ERROR) {
                            return history.push('/error/500')
                        } else {
                            alert(res.data.message);
                            setInput({
                                email : '',
                                password : '',
                                username : '',
                                nick : ''
                            })
                            return emailRef.current.focus();
                        }
                    }
                })
        } else {
            return alert('비밀번호는 공백을 제외한 영문과 특수문자를 포함한 최소8자, 최대16자 입니다')
        }
    };
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        })
    }
    const classes = useStyles();
    return (
        <Box>
            <form className={classes.form} onSubmit={onSubmitSignup}>
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
    )
}

export default Form
