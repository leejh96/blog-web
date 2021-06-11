import React from 'react'
import {Link} from 'react-router-dom';

function AuthF() {
    const list = [
        {
            tag : "로그인",
            link : "/login",
        },
        {
            tag : '회원가입',
            link : '/signup'
        }

    ];
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
