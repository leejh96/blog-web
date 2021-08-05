import React, { useState, useEffect } from 'react'
import { Box, TextField, Button, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { searchNotice } from '../../../../actions/NoticeAction';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'baseline',
        },
        text : {
            marginRight : '20px',
        },
        select : {
            marginRight : '20px',
        }
    }
})

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
    const classes = useStyles();
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
        <Box className={classes.area}>    
            <form onSubmit={onSubmithandler}>
                <Select
                    className={classes.select}
                    native
                    value={selectedType}
                    variant="outlined"
                    onChange={onChangeSelect}
                >
                    {type.map((v, i) => (
                        <option key={v+i} value={v.type}>{v.value}</option>
                    ))} 
                </Select>
                <TextField className={classes.text} onChange={onChangeText} placeholder="검색" variant="outlined" required />
                <Button type='submit' variant="contained">검색</Button>
            </form>
        </Box>
    )
}

export default Search
