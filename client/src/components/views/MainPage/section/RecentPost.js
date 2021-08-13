import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';
import { loadRecentStudy } from '../../../../actions/StudyAction';
const useStyles = makeStyles( theme => {
    return {
        area : {
            border: '1px solid black',
            width : '40%',
            height : '500px',
            borderRadius : '25px 25px 25px 25px',
            boxShadow : '5px 5px 5px rgba(0,0,0,0.3)',
            [theme.breakpoints.down('md')]: {
                marginBottom : '20px',
                width : '60%',
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom : '20px',
                width : '100%',
            },
        },
        title : {
            padding : '30px 0 30px 0',
            align : 'center',
            borderBottom : '1px solid #eeeeee'
        },

        post : {
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

function RecentPost() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const studyCount = useSelector(state => state.StudyReducer.studyCount);
    useEffect(() => {
        dispatch(loadRecentStudy())
        .then(res => {
            setPosts(res.data);
        })
    }, [dispatch, studyCount])
    return (
        <Box className={classes.area}>
            <Typography variant='h5' align='center' className={classes.title}> 최근 게시물 </Typography>
            {posts.map((val, i) => (
                <Box className={classes.post} display='flex'  key={i}>
                    <Box className={classes.number}>{i+1}</Box>
                    <Link className={classes.postLink} to={val.link} >{val.subject}</Link>
                </Box>
            ))}
        </Box>
    )
}

export default RecentPost
