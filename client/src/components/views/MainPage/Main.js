import React from 'react';
import Intro from './section/Introduce';
import Notice from './section/Notice';
import RecentPost from './section/RecentPost';
import styled from 'styled-components';

const Content = styled.div`
    display : flex;
    margin-top : 10px;
    padding-bottom : 10px;
    justify-content : space-around;
    @media screen and (max-width : 1200px){
        flex-direction : column;
        align-items : center;
    }
`;

function Main() {
    document.title = 'JULOG'
    return (
        <>
            <Intro />
            <Content>
                <Notice />
                <RecentPost />
            </Content>
        </>
    )
}
export default Main
