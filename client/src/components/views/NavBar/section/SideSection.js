import React, {useState, Fragment} from 'react'
import { Divider, Container, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Study from './section/Study';
import Board from './section/Board';
import Setting from './section/Setting'
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => {
    return {
        area : {
            width : '100%',
        },
        titlediv : {
            display : 'flex',
            justifyContent :'center'
        },
        btn : {
            margin : 0,
            minWidth : '32px',
            fontSize : '24px'
        },
        divide1 : {
            marginBottom : '10px'
        },
        divide2 : {
            margin : '10px 0'
        },
    }
})
function Sidebar() {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [toggle, setToggle] = useState(false);

    const onClickBtn = () => {
        if(toggle){
            setToggle(false);
        }else{
            setToggle(true);
        }
    }

    return (
        <Container className={classes.area} disableGutters>
        { pathname.indexOf('/setting') !== -1 ?
            <Setting />
            :
            <Fragment>
                <Box className={classes.titlediv}>
                    <Button size='small' className={classes.btn} onClick={onClickBtn} variant='text'>Menu</Button>
                </Box>
                {
                    toggle ?
                    <Box>
                        <Divider className={classes.divide1}/>
                        <Study />
                        <Divider className={classes.divide2}/>
                        <Board />
                    </Box>
                :
                    <Fragment>
                    </Fragment>
                
                }

            </Fragment>
        }
        </Container> 
    )
}

export default Sidebar
