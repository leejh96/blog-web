import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => {
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
            padding : '30px 12px 30px 12px',
            align : 'center',
            borderBottom : '1px solid #eeeeee'

        },

        post : {
            padding : '12px',
            justifyContent : 'space-between',
            alignItems :'center',
            fontSize : '1.25rem',
        },
        postLink : {
            textDecoration : 'none',
            color : 'black',
            '&:hover' : {
                color : '#999999',
            },
        },
        number : {
            textAlign :'left',
            width : '5%'
        },
        author : {
            textAlign :'center',
            width : '20%'
        },
        titleName : {
            textAlign :'center',
            width : '75%'
        },
    }
});


function Notice() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state =>  state.UserReducer.user);
    useEffect(() => {
        dispatch(loadNotice())
        .then(res => {
            setPosts(res.data.slice(0,8));
        })

        return () => {
            setPosts([]);
        }
    },[dispatch])
    return (
        <Box className={classes.area}>
            <Typography variant='h5' align='center' className={classes.title}>공지사항</Typography>
            {posts.map((val, i) => (
                <Box className={classes.post} display='flex' key={i}>
                    <Box className={classes.number}>{i+1}</Box>
                    <Box className={classes.titleName}><Link className={classes.postLink} to={user._id ? `/notice/1/${val._id}` : '/login'}  >{val.title}</Link></Box>
                    <Box className={classes.author}>{val.author ? val.author.nick : '알수없음'}</Box>
                </Box>
            ))}
        </Box>
    )
}

export default Notice
