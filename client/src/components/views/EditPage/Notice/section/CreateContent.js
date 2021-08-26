import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createNotice } from '../../../../../actions/NoticeAction';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_ERROR, CREATE_NOTICE, CREATE_NOTICE_ERROR, SERVER_ERROR } from '../../../../../actions/type';

const useStyles = makeStyles(theme => ({
    title : {
        marginBottom : '20px',
    },
    text : {
        marginBottom : '20px',
    },
    buttonArea : {
        display : 'flex',
        justifyContent : 'flex-end'
    }
}))


function CreateContent() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeText = (e) => {
        setText(e.target.value)
    }
    const onSubmithandler = (e) => {
        e.preventDefault();
        const data = {
            title,
            text,
            date : moment().format('YYYY-MM-DD HH:mm:ss')

        }
        dispatch(createNotice(data))
        .then(res => {
            if(res.type === CREATE_NOTICE){
                return history.push('/notice/1');
            }
            if(res.type === CREATE_NOTICE_ERROR){
                return alert(res.data.message);
            }
            if(res.type === AUTH_ERROR){
                alert(res.data.message);
                return history.push('/login');
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }
        })
    };

    return (
        <form onSubmit={onSubmithandler}>
            <Box>
                <TextField className={classes.title} onChange={onChangeTitle} variant='outlined' placeholder="제목을 입력하세요" required fullWidth/>
                <TextField className={classes.text} variant='outlined' onChange={onChangeText} placeholder="내용을 입력하세요" rows='30' fullWidth multiline={true} required />
            </Box>
            <Box className={classes.buttonArea}>
                <Button variant="contained" type="submit">작성</Button>
            </Box>
        </form>
    )
}

export default CreateContent
