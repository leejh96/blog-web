// import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from  'react-router-dom';
import styled from 'styled-components';

const pagenagtionSection = styled.div`
    display : flex;
    justify-content : space-around;
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
        <pagenagtionSection>
            {totalPage.map((val, idx) => (
                <Link key={idx} to={`/notice/${val}`}>{val}</Link>
            ))}         
        </pagenagtionSection>
    )
}

export default Pagenation
