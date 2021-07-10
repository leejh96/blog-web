// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from  'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

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
const CurrentPageLink = styled(Link)`
    text-decoration : underline;
    color : #3b77af;
    margin-right : 10px;
    &:hover{
        text-decoration : underline;
        color : #999999;
    };
`;
const pageArrCreate = (cnt) => {
    let remainder = cnt % 10 ? 1 : 0 ;
    let pageCnt = parseInt(cnt / 10) + remainder;
    let pageArr = [1];
    for(let i = 1; i< pageCnt; i++){
        pageArr.push(i+1)
    }
    return pageArr;
}

function Pagenation() {
    const noticesCount = useSelector(state => state.NoticeReducer.notices).length;
    const [page, setPage] = useState([]);
    const pageNumber = useParams().page
    useEffect(() => {
        setPage([...pageArrCreate(noticesCount)])
    }, [noticesCount])
    return (
        <PagenationArea>
            <PagenationLink to={`/notice/1`}>{'<<'}</PagenationLink>
            {parseInt(pageNumber) === 1 ?
                <></>
            :
                <PagenationLink to={`${parseInt(pageNumber) - 1}`}>{'<'}</PagenationLink> 
            }
            {page.map((val, idx) => (
                val === parseInt(pageNumber) ? 
                <CurrentPageLink key={idx} to={`/notice/${val}`}>{val}</CurrentPageLink>
                :
                <PagenationLink key={idx} to={`/notice/${val}`}>{val}</PagenationLink>
            ))}
            {parseInt(pageNumber) === page.length ?
                <></>
            :
                <PagenationLink to={`${parseInt(pageNumber) + 1}`}>{'>'}</PagenationLink> 
            }  
            <PagenationLink to={`/notice/${page.length}`}>{'>>'}</PagenationLink>
        </PagenationArea>
    )
}

export default Pagenation
