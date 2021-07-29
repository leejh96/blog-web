import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/views/NavBar/Navbar';
import Sidebar from '../components/views/SideBar/Sidebar';
import Footer from '../components/views/Footer/Footer';

const MainPage = styled.div`
    margin-left : 15%;
    margin-right : 15%;
    display : flex;
    min-width : 480px;
    @media screen and (max-width : 1200px){
        margin: 0;
    }
`;
const ContentArea = styled.div`
    flex-direction : row;
    width : calc(100% - 200px);
    padding : 0 30px;
    @media screen and (max-width : 768px){
        width : 100%;
    }
    min-width : 480px;
`;

function Frame(Component) {
    function WithFrameComponent(){
        return (        
            <>
                <Navbar />
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
