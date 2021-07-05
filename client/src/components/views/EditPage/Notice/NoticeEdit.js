import React from 'react'
import Navbar from '../../NavBar/Navbar';
import Sidebar from '../../SideBar/Sidebar';
import Footer from '../../Footer/Footer';
import CreateContent from './section/CreateContent';
import UpdateContent from './section/UpdateContent';
import {Divider, TextField} from '@material-ui/core';
import styled from 'styled-components';
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
    display : flex;
    flex-direction : column;
    margin-top : 10px;
    padding-bottom : 10px;
    justify-content : space-around;
`;
function NoticeEdit() {
    const params = useParams();
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    {params.id === undefined ?
                    <>
                        <h2>공지사항 작성</h2>
                        <Content>
                            <CreateContent />
                        </Content>
                    </>
                    :
                    <>                        
                        <h2>공지사항 수정</h2>
                        <Content>
                            <UpdateContent />
                        </Content>
                    </>
                    }

                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default NoticeEdit