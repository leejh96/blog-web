import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../SideBar/Sidebar';
import { Divider } from '@material-ui/core';
import styled from 'styled-components';
import Express from './Express/Express';
import Algorithm from './Algorithm/Algorithm';
import Css from './CSS/Css';
import Html from './HTML/Html';
import Js from './JavaScript/Js';
import Mongodb from './MongoDB/Mongodb';
import Mysql from './MySQL/Mysql';
import ReactJS from './React/React';
import Markdown from '../Markdown/Markdown';
import MarkdownEditor from '../Markdown/MarkdownEditor';

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
    margin-top : 10px;
    padding-bottom : 10px;
`;
function Study(props) {
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
                        <MarkdownEditor />
                    </Content>
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default Study
