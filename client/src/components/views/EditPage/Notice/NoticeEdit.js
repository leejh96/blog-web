import React from 'react'
import CreateContent from './section/CreateContent';
import UpdateContent from './section/UpdateContent';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        flexDirection : 'column',
        marginTop : '10px',
        paddingBottom : '10px',
        justifyContent : 'space-around',
    },
    title : {
        margin : '16px 0',
        fontWeight : 'bold'
    }
}))
function NoticeEdit() {
    const classes = useStyles();
    const params = useParams();
    return (
        <>
            {params.id === undefined ?
            <Box>
                <Typography variant='h5' className={classes.title}>공지사항 작성</Typography>
                <Box className={classes.area}>
                    <CreateContent />
                </Box>
            </Box>
            :
            <Box>                        
                <Typography variant='h5' className={classes.title}>공지사항 수정</Typography>
                <Box className={classes.area}>
                    <UpdateContent />
                </Box>
            </Box>
            }
        </>
    )
}

export default NoticeEdit