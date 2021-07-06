import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../LoadingPage/Loading'; 
import { addLike, loadLike, loadOneNotice } from '../../../../actions/NoticeAction';

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

function NoticeDetail() {
    const id = useParams().id;
    const dispatch = useDispatch();
    const [cnt, setCnt] = useState(0);
    const [toggle, setToggle] = useState(0);
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

    useEffect(() => {
        dispatch(loadLike(id))
        .then(res => {
            setCnt(res.count);
        })
    },[dispatch, cnt, id])


    const onClickLike = () => {
        if(toggle === 0){
            setToggle(1);
            dispatch(addLike(id))
            .then(res => {
                setCnt(res.data.length);
            })
        }else{
            setToggle(0);
            dispatch(addLike(id))
            .then(res => {
                setCnt(res.data.length);
            })
        }
    };

    return (
        <>
            {load ?
                <Loading />
            :
                <>
                    <div>
                        <TitleText variant='outlined' inputProps={
                            { readOnly: true, }
                        } value={ notice.title }/>
                        <Author variant='outlined' inputProps={
                            { readOnly: true, }
                        } value={ notice.author.nick || '' }/>
                        <Text variant='outlined'  rows='30' multiline inputProps={
                            { readOnly: true, }
                        } value={ notice.text }/>
                    </div>
                    <div align='center'>
                        <Button variant='contained' onClick={onClickLike}>{`좋아요 ${cnt}`}</Button>
                    </div>
                </>
            }
        </>
    )
}

export default NoticeDetail