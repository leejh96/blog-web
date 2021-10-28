import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
function AuthF() {
    const classes = useStyles();
    const list = [
        {
            tag : "로그인",
            link : "/login",
        },
        {
            tag : '회원가입',
            link : '/signup'
        }

    ];
    
    return (
        <>
            { list.map((value, i) => (
                <Link key={i} to={value.link} className={classes.link}>
                    {value.tag}
                </Link>

            )) }
        </>
    )
}

export default AuthF
