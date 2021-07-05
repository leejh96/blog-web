// import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from  'react-router-dom';
import styled from 'styled-components';

const PagenationArea = styled.div`
    text-align : center;
    margin-bottom : 30px;
`;
const PagenationLink = styled(Link)`
    text-decoration : none;
    color : black;
    margin-right : 10px;
    &:hover{
        text-decoration : underline;
        color : #999999;
    };
`;

function Pagenation() {
    return (
        <PagenationArea>
            <PagenationLink to={`/notice?page=1`}>{'<<'}</PagenationLink>
            <PagenationLink to='#'>{'<'}</PagenationLink>
            <PagenationLink to='#'>{'>'}</PagenationLink>
            <PagenationLink to='#'>{'>>'}</PagenationLink>
        </PagenationArea>
    )
}

export default Pagenation
