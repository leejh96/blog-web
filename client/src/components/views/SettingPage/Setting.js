import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import Main from './section/main/Main';
import Change from './section/change/Change';
import { useParams } from 'react-router-dom';
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
function Setting() {
    const params = useParams();
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    {!params.change ? <Main /> : <Change />}
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default Setting;