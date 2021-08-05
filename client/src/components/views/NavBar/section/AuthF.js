import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
const Lists = () => {
    return [
        {
            tag : "로그인",
            link : "/login",
        },
        {
            tag : '회원가입',
            link : '/signup'
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
function AuthF() {
    const classes = useStyles();
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(Lists());
    }, [])
    
    return (
        <Box className={classes.area}>
            { list.map((value, i) => (
                <Link key={i} to={value.link} className={classes.link}>
                    {value.tag}
                </Link>

            )) }
        </Box>
    )
}

export default AuthF
