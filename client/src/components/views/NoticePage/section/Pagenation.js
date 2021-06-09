import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Link} from  'react-router-dom';
function Pagenation() {
    const [totalPage, setTotalPage] = useState([1,2,3,4]);
    useEffect(() => {
        axios.get('api/notice/page')
        .then(res => {
            return setTotalPage((prevPage) => { return [...prevPage, res.data.total ]});
        })
    },[])
    return (
        <div>
            {totalPage.map((val, idx) => (
                <span key={idx}>
                    <Link to={`/notice/${val}`}>{val}</Link> </span> 
            ))}         
        </div>
    )
}

export default Pagenation
