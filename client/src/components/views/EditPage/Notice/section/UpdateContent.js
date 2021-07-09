import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { loadOneNotice, updateNotice } from '../../../../../actions/NoticeAction';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import Loading from '../../../LoadingPage/Loading';
const TitleText = styled(TextField)`
    margin-bottom : 20px;
    width : 100%;
`;

const Text = styled(TextField)`
    width : 100%;
    margin-bottom : 20px;
`;



function UpdateContent() {
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
            setTitle(res.data.title)
            setText(res.data.text)
            setLoad(false)
        })
    }, [dispatch, id])


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
            if (res.success){
                return history.push('/notice/1');
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
                <div>
                    <TitleText onChange={onChangeTitle} variant='outlined' placeholder="제목을 입력하세요" value={title} required />
                </div>
                <div>
                    <Text variant='outlined' onChange={onChangeText} placeholder="내용을 입력하세요" rows='30' value={text} multiline required />
                </div>
                <div align="right">
                    <Button variant="contained" type="submit">수정</Button>
                </div>
            </form>
        }
        </>
    )
}

export default UpdateContent
