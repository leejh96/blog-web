import React, { useEffect, useState } from 'react'
import { Button, Container, TextField, Box } from '@material-ui/core';
import { updateMotto } from '../../../../../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    area : {
        textAlign : 'center',
        padding : '15% 0 5% 0',
        fontSize : '3rem',
    },
    text : {
        marginBottom : '20px',
    },
    btn : {
        marginBottom : '20px',
    }
}))

function Text() {
    const classes = useStyles();
    const user = useSelector(state => state.UserReducer.user);
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        setText(user.motto);
    }, [user.motto]);

    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const onSubmitText = (e) => {
        e.preventDefault();
        if(!toggle){
            return setToggle(true);
        }
        dispatch(updateMotto(text))
        .then(res => {
            if(!res.data.success){
                alert(res.data.message);
            }
            return setToggle((tog) => (!tog));
        })
    }
    return (
        <Container disableGutters>
            <Box className={classes.area}>
                {text ? text.split('\n').map((txt, idx) => (
                    <span key={txt+idx}>{txt}<br /></span>
                ))
                : '적고싶은 글귀나 명언을 입력하세요!'}
            </Box>
            <form onSubmit={onSubmitText}>
                <Box align='center'>
                    {toggle ? <TextField className={classes.text} variant='outlined' fullWidth multiline onChange={onChangeText}/> : <></>}
                    <Button className={classes.btn} type='submit'  variant='outlined'>{ toggle ? '저장' : '입력'}</Button>
                </Box>
            </form>
        </Container>
    )
}

export default Text
