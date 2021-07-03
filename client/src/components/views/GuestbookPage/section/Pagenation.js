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

function Pagenation({pageNumber}) {
    const dispatch = useDispatch();
    const [page, setPage] = useState([]);
    const guestbookLength = useSelector(state => state.GuestbookReducer.guestlength);
    useEffect(() => {
        dispatch(pagenation('/api/guestbook/count'))
        .then(res => {
            setPage(res.pageArr);
        })
    }, [dispatch, guestbookLength]);
    return (
        <PagenationArea>
            <PagenationLink to={`/guestbook/1`}>{'<<'}</PagenationLink>
            {parseInt(pageNumber.id) === 1 ?
                <></>
            :
                <PagenationLink to={`${parseInt(pageNumber.id) - 1}`}>{'<'}</PagenationLink> 
            }
            {page.map((val, idx) => (
                <PagenationLink key={idx} to={`/guestbook/${val}`}>{val}</PagenationLink>
            ))}
            {parseInt(pageNumber.id) === page.length ?
                <></>
            :
                <PagenationLink to={`${parseInt(pageNumber.id) + 1}`}>{'>'}</PagenationLink> 
            }            
            <PagenationLink to={`/guestbook/${page.length}`}>{'>>'}</PagenationLink>
        </PagenationArea>
    )
}

export default Pagenation
