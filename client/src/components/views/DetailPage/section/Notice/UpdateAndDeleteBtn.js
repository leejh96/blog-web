import React from 'react';
import { Button, Box } from '@material-ui/core';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteNotice } from '../../../../../actions/NoticeAction';
import { makeStyles } from '@material-ui/core/styles';
import { AUTH_ERROR, DELETE_NOTICE, DELETE_NOTICE_ERROR, SERVER_ERROR } from '../../../../../actions/type';

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
            if(res.type === DELETE_NOTICE){
                return history.push('/notice/1');
            }
            if(res.type === DELETE_NOTICE_ERROR){
                return alert(res.data.message);
            }
            if(res.type === AUTH_ERROR){
                alert(res.data.message);
                return history.push('/login');
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
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
