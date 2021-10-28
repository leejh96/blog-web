import React, { Fragment } from 'react'
import { Divider, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Study from './section/Study';
import Board from './section/Board';
import Setting from './section/Setting'
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => {
    return {
        area: {
            position: 'sticky',
            top: '0',
            height: '100vh',
            width: '200px',
            border: '1px solid #eeeeee',
            borderTop: 0,
            borderBottom: 0,
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        sidetitle: {
            fontWeight: 'bold',
            margin: 0,
            padding: '20px 0 20px 0',
            textAlign: 'center',
        },
        divide1: {
            marginBottom: '10px'
        },
        divide2: {
            margin: '10px 0'
        },
    }
})
function Sidebar() {
    const classes = useStyles();
    const { pathname } = useLocation();
    return (
        <Container className={classes.area} disableGutters>
            {pathname.indexOf('/setting') !== -1 ?
                <Setting />
                :
                <Fragment>
                    <Typography className={classes.sidetitle}>
                        Menu
                    </Typography>
                    <Divider className={classes.divide1} />
                    <Study />
                    <Divider className={classes.divide2} />
                    <Board />
                </Fragment>
            }
        </Container>
    )
}

export default Sidebar
