import React from 'react'
import styled from 'styled-components';
import Navbar from '../NavBar/Navbar';
import {Divider} from '@material-ui/core';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/Footer';
import Tablesection from './section/Tablesection';
import Pagenation from '../NoticePage/section/Pagenation';
import Bookbox from './section/Bookbox';
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


function Guestbook() {
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <h2>방명록</h2>
                    <Tablesection />
                    <Pagenation />
                    <Bookbox />
                </ContentArea>
            </MainPage>
            <Footer />
        </>

    )
}

export default Guestbook
