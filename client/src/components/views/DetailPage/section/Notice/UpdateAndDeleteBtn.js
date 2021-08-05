import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotice } from '../../../../../actions/NoticeAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            justifyContent : 'space-evenly',
            marginBottom : '40px',
        },
        link : {
            textDecoration : 'none',
            color : 'black',
        }
    }
})




function UpdateAndDeleteBtn() {
    const classes = useStyles();
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickDelete = (id) => () => {
        dispatch(deleteNotice(id))
        .then(res => {
            if(res.data){
                history.push('/notice/1');
            }
        })
    }
    return (
        <Box className={classes.area}>
            <Link className={classes.link} to={`/notice/${id}/edit`}><Button variant='outlined'>수정</Button></Link>
            <Button variant='outlined' onClick={onClickDelete(id)}>삭제</Button>
        </Box>
    )
}

export default UpdateAndDeleteBtn
