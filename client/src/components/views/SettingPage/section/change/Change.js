import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Nick from './section/Nick';
import Password from './section/Password';
import Resign from './section/Resign';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    title : {
        margin : '16px 0',
        fontWeight :'bold'
    }
}))

function Change() {
    const classes = useStyles();
    const change = useParams().change;
    const [title, setTitle] = useState('');
    useEffect(() => {
        switch(change){
            case 'nick':
                return setTitle('닉네임 변경');
            case 'password':
                return setTitle('비밀번호 변경');
            case 'resign':
                return setTitle('회원탈퇴');
            default : return;
        }
    }, [change])

    return (
        <Container disableGutters>
            <Typography variant='h5' className={classes.title}>{title}</Typography>
            {change === 'nick' ?
                <Nick /> 
                :
                change === 'password' ?
                <Password />
                :
                <Resign />
            }
        </Container>
    )
}

export default Change
