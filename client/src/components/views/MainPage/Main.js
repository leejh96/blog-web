import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Intro from './section/Introduce';
import Notice from './section/Notice';
import RecentPost from './section/RecentPost';
import Sidebar from '../SideBar/Sidebar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';

const MainPage = styled.div`
    margin-left : 10%;
    margin-right : 10%;
    display : flex;
`;
const ContentArea = styled.div`
    flex-direction : row;
    width : calc(100% - 200px);
    margin-left : 30px;
`;
const Content = styled.div`
    display : flex;
    margin-top : 10px;
    padding-bottom : 10px;
    justify-content : space-around;
`;
function Main() {
    document.title = 'JULOG'
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <Intro />
                    <Content>
                        <Notice />
                        <RecentPost />
                    </Content>
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}
export default Main
