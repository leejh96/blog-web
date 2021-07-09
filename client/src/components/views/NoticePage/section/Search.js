import React, { useState, useEffect } from 'react'
import { TextField, Button, Select } from '@material-ui/core';
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

const Btn = styled(Button)`
    height: 100%;
`;

const searchType = () => {
    const searchType = [
        {
            type : 'number',
            value : '번호'
        },
        {
            type : 'title',
            value : '제목'
        },
        {
            type : 'author',
            value : '작성자'
        }
    ]
    return searchType
}

function Search() {
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState({
        type : 'number',
        value : '번호'
    });
    console.log(type)
    console.log(selectedType);
    useEffect(() => {
        setType(searchType());
    }, [])

    const onChangeSelect = (e) => {
        setSelectedType({
            ...selectedType,
            type : e.target.value,
            value : type[e.target.key].value
        });
    }

    // const onSubmithandler = (e) => {
    //     e.prevantDefault();
    //     const data = {
    //         type : selectedType
    //     }
    //     dispatchEvent(searchNotice())
    // }
    return (
        <SearchArea>    
            {/* <form onSubmit={onSubmithandler}> */}
                <form>
                <SelectType
                native
                value={selectedType.type}
                variant="outlined"
                onChange={onChangeSelect}
                >
                    {type.map((v, i) => (
                        <option key={i} value={v.type}>{v.value}</option>
                    ))} 
                </SelectType>
                <InputText placeholder="검색" variant="outlined" />
                <Btn type='submit' variant="contained">검색</Btn>
            </form>
        </SearchArea>
    )
}

export default Search
