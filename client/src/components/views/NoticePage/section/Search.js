import React, { useState } from 'react'
import { TextField, Button, Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

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
function Search() {
    const [type, setType] = useState('');
    const searchType = [
        {
            value : '번호',
            type : 'number'
        },
        {
            value : '제목',
            type : 'title'
        },
        {
            value : '작성자',
            type : 'author'
        }
    ]

    const valueChange = (e) => {
        setType(e.target.value)
    };
    return (
        <SearchArea>
            <SelectType value={type} onChange={valueChange}>
                {searchType.map((v, i) => (
                    <MenuItem key={i} value={v.type}>{v.value}</MenuItem>
                ))}
            </SelectType>
            <InputText id="outlined-basic" label="내용" variant="outlined" />
            <Button variant="contained">검색</Button>
        </SearchArea>
    )
}

export default Search
