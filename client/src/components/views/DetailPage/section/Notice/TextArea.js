import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOneNotice } from '../../../../../actions/NoticeAction'; 
import Loading from '../../../LoadingPage/Loading'; 


const TitleText = styled(TextField)`
    margin-bottom : 20px;
    width : 100%;
`;

const Author = styled(TextField)`
    margin-bottom : 20px;
    width : 100%;
`;

const Text = styled(TextField)`
    width : 100%;
    margin-bottom : 20px;
`;

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
                    <TitleText variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.title }/>
                    <Author variant='outlined' inputProps={
                        { disabled: true, }
                    } value={ notice.author ? notice.author.nick : '알수없음' }/>
                    <Text variant='outlined'  rows='30' multiline inputProps={
                        { disabled: true, }
                    } value={ notice.text }/>
                </div>
            }
        </>
    )
}

export default TextArea
