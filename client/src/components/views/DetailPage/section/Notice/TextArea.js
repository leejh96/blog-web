import React, { useState, useEffect } from 'react'
import { TextField, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { loadOneNotice } from '../../../../../actions/NoticeAction'; 
import Loading from '../../../LoadingPage/Loading'; 
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_ERROR, LOAD_ONE_NOTICE, LOAD_ONE_NOTICE_ERROR, LOAD_ONE_NOTICE_VALID_ERROR, SERVER_ERROR } from '../../../../../actions/type';

const useStyles = makeStyles(theme => {
    return {
        text : {
            marginBottom : '20px'
        }
    }
})

function TextArea() {
    const classes = useStyles();
    const id = useParams().id;
    const dispatch = useDispatch();
    const [notice, setNotice] = useState({});
    const [load, setLoad] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setLoad(true);
        dispatch(loadOneNotice(id))
        .then(res => {
            if(res.type === LOAD_ONE_NOTICE){
                setNotice(res.data.notice)
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
    return (
        <>
            {load ?
                <Loading />
            :
                <Box>
                    <TextField className={classes.text} fullWidth variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.title || ' '}/>
                    <TextField className={classes.text} fullWidth variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.author ? notice.author.nick : '알수없음' }/>
                    <TextField className={classes.text} fullWidth variant='outlined'  rows='30' multiline inputProps={
                        { disabled: true, }
                    } value={ notice.text || ''}/>
                </Box>
            }
        </>
    )
}

export default TextArea
