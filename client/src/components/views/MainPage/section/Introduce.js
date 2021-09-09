import React from 'react'
import { Avatar, Container, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
    return {
        area : {
            padding : '10px 0 10px 0',
            borderBottom : '1px solid #eeeeee',
        },
        avatar : {
            width: '200px',
            height: '200px',
            marginRight : '20px'
        },
        title  : {
            textAlign : 'center',
        },
        info : {
            fontSize: 21,
        }
    }
})
function Introduce() {
    const classes = useStyles();
    const imgAddress = 'https://officen.azureedge.net/upload/editor/b26ade75-1e49-4082-8a3f-1d95299d86bb.jpg'
    return (
        <Container className={classes.area} disableGutters>
            <Box my={3}>
                <Typography component='h1' variant='h5' className={classes.title}><b>간단한 자기소개</b></Typography>
            </Box>
            <Box display='flex' flexWrap='nowrap'>
                <Avatar variant='rounded' className={classes.avatar}>
                    <img src={imgAddress} alt='bloggerimage' width='100%' height= '100%'/>
                </Avatar>
                <Box>
                    <Typography variant='body1' className={classes.info} >
                        안녕하세요 블로그 개설자 입니다.<br />
                        <b>공부 목적으로 만들어진 블로그 입니다.</b><br />
                        제가 아는 것을 알려드리고 잘못되거나 모르는 것은 같이 공유하는 <br />
                        그런 블로그가 되었으면 합니다.<br />
                        찾아주셔서 감사드리고 오늘 하루도 좋은 시간 보내셨으면 좋겠습니다~!!
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Introduce
