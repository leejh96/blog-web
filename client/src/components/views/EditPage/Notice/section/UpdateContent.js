import React, { useState, useEffect } from 'react'
import { TextField, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadOneNotice, updateNotice } from '../../../../../actions/NoticeAction';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import Loading from '../../../LoadingPage/Loading';
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_ONE_NOTICE, LOAD_ONE_NOTICE_ERROR, LOAD_ONE_NOTICE_VALID_ERROR, AUTH_ERROR, SERVER_ERROR, UPDATE_NOTICE, UPDATE_NOTICE_ERROR } from '../../../../../actions/type';


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

function UpdateContent() {
    const classes = useStyles();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const [load, setLoad] = useState(false);
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        setLoad(true)
        dispatch(loadOneNotice(id))
        .then(res => {
            if(res.type === LOAD_ONE_NOTICE){
                setTitle(res.data.title)
                setText(res.data.text)
                return setLoad(false);
            }
            if(res.type === LOAD_ONE_NOTICE_ERROR){
                return alert(res.data.message);
            }
            if(res.type === LOAD_ONE_NOTICE_VALID_ERROR){
                return history.push('/Notfound');
            }
            if(res.type === AUTH_ERROR){
                alert(res.data.message);
                return history.push('/login');
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }

        })
    }, [dispatch, id, history])


    const onChangeText = (e) => {
        setText(e.target.value)
    }
    const onSubmithandler = (e) => {
        e.preventDefault();

        const data = {
            id,
            title,
            text,
            date : moment().format('YYYY-MM-DD HH:mm:ss')
        }
        dispatch(updateNotice(data))
        .then(res => {
            if(res.type === UPDATE_NOTICE){
                return history.push('/notice/1');
            }
            if(res.type === UPDATE_NOTICE_ERROR){
                return alert(res.data.message);
            }
            if(res.type === AUTH_ERROR){
                alert(res.data.message);
                return history.push('/login')
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }
        })
    };

    return (
        <>
        {
            load ?
            <Loading />
            :
            <form onSubmit={onSubmithandler}>
                <Box>
                    <TextField className={classes.title} onChange={onChangeTitle} variant='outlined' placeholder="제목을 입력하세요" required fullWidth/>
                    <TextField className={classes.text} variant='outlined' onChange={onChangeText} placeholder="내용을 입력하세요" rows='30' fullWidth multiline={true} required />
                </Box>
                <Box className={classes.buttonArea}>
                    <Button variant="contained" type="submit">수정</Button>
                </Box>
            </form>
        }
        </>
    )
}

export default UpdateContent
