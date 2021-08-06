import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { changeNick } from '../../../../../../actions/UserAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    nickArea : {
        boxSizing : 'border-box',
        border : '1px solid #c4c4c4',
        height : '60px',
        fontSize : '1.5rem',
        padding : '10px',
        borderRadius : '5px',
        marginBottom : '30px',
    },
    btnArea : {
        display : 'flex',
        justifyContent : 'space-around',
        marginTop : '50px',
    }
}))

function Nick() {
    const [text, setText] = useState('');
    const user = useSelector(state => state.UserReducer.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const onSubmitChange = (e) => {
        e.preventDefault();
        if(user.nick === text){
            return alert('기존 닉네임과 같습니다');
        }
        dispatch(changeNick(text))
        .then(res => {
            if(res.data.success){
                alert(res.data.message);
                return history.push('/setting');
            }
            return alert(res.data.message);
        })
    }
    const onClickCancel = () => {
        return history.push('/setting');
    }
    const onChangeNick = (e) => {
        setText(e.target.value);
    };
    return (
        <form onSubmit={onSubmitChange}>
            <Box>
                <Box className={classes.nickArea}>{user.nick}</Box>
                <TextField fullWidth variant='outlined' onChange={onChangeNick} placeholder='변경할 닉네임을 입력하세요' required/>
            </Box>
            <Box className={classes.btnArea}>
                <Button type='submit' variant='outlined'>변경</Button>
                <Button variant='outlined' onClick={onClickCancel}>취소</Button>
            </Box>
        </form>
    )
}

export default Nick
