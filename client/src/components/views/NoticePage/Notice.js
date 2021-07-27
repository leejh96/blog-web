import React from 'react'
import TableSection from './section/TableSection';
import Pagenation from './section/Pagenation';
import Search from './section/Search';
import ButtonSection from './section/ButtonSection';
import styled from 'styled-components';


const Content = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 10px;
    padding-bottom : 10px;
    justify-content : space-around;
`;
function Notice() {
    document.title = 'NOTICE'
    return (
        <>
            <h2>공지사항</h2>
            <Content>
                <TableSection />
                <ButtonSection />
                <Pagenation />
                <Search />
            </Content>
        </>
    )
}

export default Notice
