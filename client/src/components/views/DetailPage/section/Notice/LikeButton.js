import React, { useState, useEffect } from 'react'
import { Box, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addLike, deleteLike } from '../../../../../actions/NoticeAction';
import { loadLike } from '../../../../../actions/NoticeAction';
import { makeStyles } from '@material-ui/core/styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles(theme => {
    return {
        area : {
            marginBottom : '20px',
            textAlign : 'center',
        },
        onToggle : {
            '&:hover' : {
                backgroundColor : '#87cefa',
            }
        },
        icon : {
            marginRight : '10px'
        }
    }
})

function LikeButton() {
    const id = useParams().id;
    const dispatch = useDispatch();
    const [cnt, setCnt] = useState(0);
    const [toggle, setToggle] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        dispatch(loadLike(id))
        .then(res => {
            setCnt(res.data.length);
            res.data.includes(res.user) ? setToggle(1) : setToggle(0);
        })
    },[dispatch, toggle, id])

    const onClickLike = () => {
        if(toggle === 0){
            dispatch(addLike(id))
            .then(res => {
                setCnt(res.data);
                setToggle(1);
            })
        }else{
            dispatch(deleteLike(id))
            .then(res => {
                setCnt(res.data);
                setToggle(0);
            })
        }
    };

    return (
        <Box className={classes.area}>
            { 
                toggle ? 
                <IconButton color='primary' className={classes.onToggle} variant='contained' onClick={onClickLike}><ThumbUpIcon className={classes.icon}/>{`${cnt}`}</IconButton>
                :
                <IconButton variant='contained' onClick={onClickLike}><ThumbUpIcon className={classes.icon}/>{`${cnt}`}</IconButton>
            }
        </Box>
    )
}

export default LikeButton
