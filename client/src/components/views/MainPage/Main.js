import React, { Fragment } from 'react';
import Intro from './section/Introduce';
// import Notice from './section/Notice';
// import RecentPost from './section/RecentPost';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import BoxWrap from './section/BoxWrap';
import NoticeEx from './section/NoticeEx';
import RecentPostEx from './section/RecentPostEx';
const useStyles = makeStyles(theme => {
    return {
        area: {
            display: 'flex',
            marginTop: '10px',
            paddingBottom: '10px',
            justifyContent: 'space-around',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        }
    }
})

function Main() {
    const classes = useStyles();
    document.title = 'JULOG'
    return (
        <Fragment>
            <Intro />
            <Container className={classes.area} disableGutters>
                {/* <Notice /> */}
                {/* <RecentPost /> */}

                <BoxWrap>
                    <NoticeEx title="공지사항" />
                </BoxWrap>
                <BoxWrap>
                    <RecentPostEx title="최근 게시물" />
                </BoxWrap>
            </Container>
        </Fragment>
    )
}
export default Main
