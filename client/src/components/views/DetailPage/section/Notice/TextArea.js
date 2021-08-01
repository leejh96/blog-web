import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOneNotice } from '../../../../../actions/NoticeAction'; 
import Loading from '../../../LoadingPage/Loading'; 


function TextArea() {

    const id = useParams().id;
    const dispatch = useDispatch();
    const [notice, setNotice] = useState({ 
        title : '',
        author : '',
        text : ''
    });
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
                <div>
                    <TextField style={{ marginBottom : '20px'}} fullWidth variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.title }/>
                    <TextField style={{ marginBottom : '20px'}} fullWidth variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.author ? notice.author.nick : '알수없음' }/>
                    <TextField style={{ marginBottom : '20px'}} fullWidth variant='outlined'  rows='30' multiline inputProps={
                        { disabled: true, }
                    } value={ notice.text }/>
                </div>
            }
        </>
    )
}

export default TextArea
