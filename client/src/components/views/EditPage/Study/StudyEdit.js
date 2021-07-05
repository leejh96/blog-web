import React from 'react';
import Navbar from '../../NavBar/Navbar';
import Footer from '../../Footer/Footer';
import Sidebar from '../../SideBar/Sidebar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import MarkdownEditor from '../../Markdown/MarkdownEditor';
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
function StudyEdit(props) {
    const study = props.match.params.study;
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <h2>{study}</h2>
                    <Content>
                        <MarkdownEditor page={study}/>
                    </Content>
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default StudyEdit;
