import React from 'react'
import {Link} from 'react-router-dom';
function AuthF() {
    const list =  ['로그인', '회원가입'];
    const link = ['/login', '/signup', '#'];
    return (
        <div style={{ display : 'flex',justifyContent : 'flex-end', flexWrap : 'wrap'}}>
            <ul style= {{
                display : 'flex',
                listStyle : 'none',
                margin: 0,
                padding : 0,
            }}>
                { list.map((value, i) => (
                    <Link style={{ 
                        textDecoration : 'none',
                        color : 'black',
                        marginRight: '5px', 
                        fontSize : '6px'
                    }} key={i} to={link[i]}>
                        {value}
                    </Link>
                )) }
            </ul>
        </div>
    )
}

export default AuthF
