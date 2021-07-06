import React from 'react'
import Navbar from '../NavBar/Navbar';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/Footer';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import NoticeDetail from './section/NoticeDetail';
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
flex-direction : column;
margin-top : 10px;
padding-bottom : 10px;
justify-content : space-around;
`;

function Detail() {
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <h2>공지사항</h2>
                    <Content>
                        <NoticeDetail />
                    </Content>
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default Detail;