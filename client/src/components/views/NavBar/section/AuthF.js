import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

const Lists = () => {
    return [
        {
            tag : "로그인",
            link : "/login",
        },
        {
            tag : '회원가입',
            link : '/signup'
        }

    ];
}

function AuthF() {
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(Lists());
    }, [])
    
    return (
        <div align="right">
            { list.map((value, i) => (
                    <Link key={i} to={value.link} style={{
                        textDecoration : 'none',
                        color : 'black',
                        marginRight: '5px', 
                        fontSize : '6px'
                    }}>
                        {value.tag}
                    </Link>

            )) }
        </div>
    )
}

export default AuthF
