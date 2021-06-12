// import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from  'react-router-dom';
import styled from 'styled-components';

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
    const [totalPage, setTotalPage] = useState([1,2,3,4]);
    // useEffect(() => {
    //     axios.get('api/notice/page')
    //     .then(res => {
    //         return setTotalPage((prevPage) => { return [...prevPage, res.data.total ]});
    //     })
    // },[])
    return (
        <div align="center">
            {totalPage.map((val, idx) => (
                <PagenationLink key={idx} to={`/notice?page=${val}`}>{val}</PagenationLink>
            ))}         
        </div>
    )
}

export default Pagenation
