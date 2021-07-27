import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/views/NavBar/Navbar';
import Sidebar from '../components/views/SideBar/Sidebar';
import Footer from '../components/views/Footer/Footer';
import { Divider } from '@material-ui/core';


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

function Frame(Component) {
    function WithFrameComponent(){
        return (        
            <>
                <Navbar />
                <Divider />
                <MainPage>
                    <Sidebar />
                    <ContentArea>
                        <Component />
                    </ContentArea>
                </MainPage>
                <Footer />
            </>
        )
    }
    return WithFrameComponent
}

export default Frame
