import axios from 'axios'
import React from 'react'
import { withRouter, Link } from 'react-router-dom';

function authT(props) {
    const list = [
        {
            tag : "내 정보",
            link : "/mySetting",
        },
        {
            tag : '로그아웃',
            link : '#'
        }

    ];
    const onClickLogout = () => {
        axios.get('/api/user/logout')
        .then(res => {
            if(res.data.success){
                localStorage.removeItem('auth');
                return props.history.push('/login');
            }
            return alert('로그아웃에 실패했습니다.');
        })
    }
    return (
        <div align="right">
            { list.map((value, i) => (
                value.tag !== '로그아웃' ? 
                <Link key={i} to={value.link} style={{
                    textDecoration : 'none',
                    color : 'black',
                    marginRight: '5px', 
                    fontSize : '6px'
                }}>
                        {value.tag}
                </Link>
                : 
                <Link key={i} to={value.link} onClick={onClickLogout} style={{
                    textDecoration : 'none',
                    color : 'black',
                    marginRight: '5px', 
                    fontSize : '6px'
                }}>
                    {value.tag}
                </Link>
            ))}
        </div>
    )
}

export default withRouter(authT);
