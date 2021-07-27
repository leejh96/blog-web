import React from 'react'
import styled from 'styled-components';
import NoticeDetail from './section/NoticeDetail';

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
            <h2>공지사항</h2>
            <Content>
                <NoticeDetail />
            </Content>
        </>
    )
}
export default Detail;