import React, { useEffect, useState } from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import MarkdownSection from '../Markdown/Markdown';
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
const Content = styled.div`
    width : 100%;
    margin-top : 10px;
    padding-bottom : 10px;
`;
function Study() {
    const { study } = useParams();
    const [page, setPage] = useState('');

    useEffect(() => {
        setPage(study);
    }, [])
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <h2>{page}</h2>
                    <Content>
                        <MarkdownSection />
                    </Content>
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default Study
