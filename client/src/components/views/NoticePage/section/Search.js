import React, { useState, useEffect } from 'react'
import { TextField, Button, Select } from '@material-ui/core';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { searchNotice } from '../../../../actions/NoticeAction';
const SearchArea = styled.div`
    display : flex;
    justify-content : center;
    align-items : baseline;
`;

const InputText = styled(TextField)`
    margin-right : 20px;
`;

const SelectType = styled(Select)`
    margin-right : 20px;
`;


const searchType = () => {
    const searchType = [
        {
            type : 'title',
            value : '제목'
        },
        {
            type : 'author',
            value : '작성자'
        }
    ]
    return searchType;
}

function Search() {
    const [type, setType] = useState([]);
    const [text, setText] = useState('');
    const [selectedType, setSelectedType] = useState('title');
    const dispatch = useDispatch();
    const notices = useSelector(state => state.NoticeReducer.notices)
    useEffect(() => {
        setType(searchType());
    }, [])

    const onChangeSelect = (e) => {
        setSelectedType(e.target.value)
    }
    const onChangeText = (e) => {
        setText(e.target.value);
    }

    const onSubmithandler = (e) => {
        e.preventDefault();
        dispatch(searchNotice(notices, text, selectedType))
    }
    return (
        <SearchArea>    
            <form onSubmit={onSubmithandler}>
                <SelectType
                    native
                    value={selectedType}
                    variant="outlined"
                    onChange={onChangeSelect}
                >
                    {type.map((v, i) => (
                        <option key={v+i} value={v.type}>{v.value}</option>
                    ))} 
                </SelectType>
                <InputText onChange={onChangeText} placeholder="검색" variant="outlined" required />
                <Button type='submit' variant="contained">검색</Button>
            </form>
        </SearchArea>
    )
}

export default Search
