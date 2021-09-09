import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../actions/UserAction';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { AUTH_ERROR, LOGOUT_ERROR, LOGOUT_USER, SERVER_ERROR } from '../../../../actions/type';
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
            fontSize : '0.5rem'
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
        let access = localStorage.getItem('access');
        if(!access){
            access = '';
        }
        dispatch(logoutUser(access))
        .then(res => {
            if( res.type === LOGOUT_USER && !localStorage.getItem('access')){
                //google 로그아웃
                return history.push('/login');
            }
            if( res.type === LOGOUT_USER && localStorage.getItem('access')){
                //로컬 로그아웃
                localStorage.removeItem('access');
                return history.push('/login');
            }
            if( res.type === AUTH_ERROR ){
                //세션 만료나 auth에서 어떠한 오류 발생
                localStorage.removeItem('access');
                alert(res.data.message)
                return history.push('/login')
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500')
            }
            if( res.type === LOGOUT_ERROR ){
                alert(res.data.message)
                return history.push('/')
            }
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
