import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../actions/UserAction';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
const Lists = () => {
    return [
        {
            tag : "내 정보",
            link : "/setting",
        },
        {
            tag : '로그아웃',
            link : '#'
        }
    ];
}
const useStyles = makeStyles(theme => {
    return {
        area : {
            textAlign : 'right',
        },
        link : {
            textDecoration : 'none',
            color : 'black',
            marginRight: '5px', 
            fontSize : '6px'
        }
    }
})
function AuthT() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(Lists);
    }, [])

    const onClickLogout = () => {
        // //구글로그아웃
        // dispatch(oauthLogout())
        // .then(res => {

        // })
        
        //로컬로그아웃
        dispatch(logoutUser())
        .then(res => {
            if(res.data.success && !localStorage.getItem('access')){
                //google 
                return history.push('/login');
            }
            if(res.data.success){
                localStorage.removeItem('access');
                return history.push('/login');
            }
            if(!res.data.auth){
                localStorage.removeItem('access');
                return history.push('/login')
            }
            return history.push('/login')
        })
    }
    return (
        <Box className={classes.area}>
            { list.map((value, i) => (
                value.tag !== '로그아웃' ? 
                <Link key={i} to={value.link} className={classes.link}>
                    {value.tag}
                </Link>
                : 
                <Link key={i} to={value.link} onClick={onClickLogout} className={classes.link}>
                    {value.tag}
                </Link>
            ))}
        </Box>
    )
}

export default AuthT;
