import React, {useState} from 'react'
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createNotice } from '../../../../../actions/NoticeAction';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const TitleText = styled(TextField)`
    margin-bottom : 20px;
    width : 100%;
`;

const Text = styled(TextField)`
    width : 100%;
    margin-bottom : 20px;
`;



function CreateContent() {
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
            if (res.success){
                return history.push('/notice/1');
            }
        })
    };

    return (
        <form onSubmit={onSubmithandler}>
            <div>
                <TitleText onChange={onChangeTitle} variant='outlined' placeholder="제목을 입력하세요" required />
            </div>
            <div>
                <Text variant='outlined' onChange={onChangeText} placeholder="내용을 입력하세요" rows='30' multiline required />
            </div>
            <div align="right">
                <Button variant="contained" type="submit">작성</Button>
            </div>
        </form>
    )
}

export default CreateContent
