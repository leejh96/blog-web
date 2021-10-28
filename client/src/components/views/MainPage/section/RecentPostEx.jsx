import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import { loadRecentStudy } from '../../../../actions/StudyAction';
import { LOAD_RECENT_STUDY, LOAD_RECENT_STUDY_ERROR, SERVER_ERROR } from '../../../../actions/type';
const useStyles = makeStyles( theme => {
    return {
        title : {
            padding : '30px 0 30px 0',
            align : 'center',
            borderBottom : '1px solid #eeeeee'
        },
        post : {
            display:'flex',
            alignItems :'center',
            padding : '12px',
            fontSize : '1.25rem',
        },
        postLink : {
            margin : '0 auto',
            textDecoration : 'none',
            color : 'black',
            '&:hover' : {
                color : '#999999',
            },
        },
    }
})

function RecentPost({ title }) {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const studyCount = useSelector(state => state.StudyReducer.studyCount);
    const history = useHistory();
    useEffect(() => {
        dispatch(loadRecentStudy())
        .then(res => {
            if(res.type === LOAD_RECENT_STUDY){
                return setPosts(res.data);
            }
            if(res.type === LOAD_RECENT_STUDY_ERROR){
                return alert(res.data.message);
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }
        })
        return () => {
            setPosts([]);
        }
    }, [dispatch, studyCount, history])
    return (
        <>
            <Typography variant='h5' align='center' className={classes.title}>{title}</Typography>
            {posts.map((val, i) => (
                <Box className={classes.post} key={i}>
                    <Box className={classes.number}>{i+1}</Box>
                    <Link className={classes.postLink} to={val.link}>{val.subject}</Link>
                </Box>
            ))}
        </>
    )
}

export default RecentPost
