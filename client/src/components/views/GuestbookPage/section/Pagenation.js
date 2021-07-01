// import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from  'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { pagenation } from '../../../../actions/GuestbookAction';
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
    const dispatch = useDispatch()
    const [pageArr, setPageArr] = useState([]);
    const { pageCnt } = useSelector(state => ({
        pageCnt : state.GuestbookReducer.pageCnt
    }));
    useEffect(() => {
        const url = '/api/guestbook/count';
        dispatch(pagenation(url))
        .then(res => {
            setPageArr(...res.pageArr);
        })
    }, [dispatch])
    return (
        <PagenationArea>
            <PagenationLink to={`/guestbook/1`}>{'<<'}</PagenationLink>
            <PagenationLink to='#'>{'<'}</PagenationLink>
            {pageArr.map((val, idx) => (
                <PagenationLink key={idx} to={`/guestbook/${val}`}>{val}</PagenationLink>
            ))}
            <PagenationLink to='#'>{'>'}</PagenationLink>
            <PagenationLink to={`/guestbook/${pageArr[pageArr.length]}`}>{'>>'}</PagenationLink>
        </PagenationArea>
    )
}

export default Pagenation
