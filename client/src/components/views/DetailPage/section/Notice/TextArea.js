import React, { useState, useEffect } from 'react'
import { TextField, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOneNotice } from '../../../../../actions/NoticeAction'; 
import Loading from '../../../LoadingPage/Loading'; 
import { makeStyles } from '@material-ui/core/styles';

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

    useEffect(() => {
        setLoad(true);
        dispatch(loadOneNotice(id))
        .then(res => {
            setNotice(res.data)
            setLoad(false);
        })
    }, [dispatch, id])
    return (
        <>
            {load ?
                <Loading />
            :
                <Box>
                    <TextField className={classes.text} fullWidth variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.title || ''}/>
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
