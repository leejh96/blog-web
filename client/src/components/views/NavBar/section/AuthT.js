import axios from 'axios'
import React from 'react'
import { withRouter, Link } from 'react-router-dom';
function authT(props) {
    const list =  ['내 정보', '로그아웃'];
    const link = ['/mySetting', '#'];
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
        <div style={{ display : 'flex',justifyContent : 'flex-end', flexWrap : 'wrap'}}>
            <ul style= {{
                display : 'flex',
                listStyle : 'none',
                margin: 0,
                padding : 0,
            }}>
                { list.map((value, i) => (
                    value !== '로그아웃' ? <Link style={{ 
                        textDecoration : 'none',
                        color : 'black',
                        marginRight: '5px', 
                        fontSize : '6px'
                    }} key={i} to={link[i]}>
                        {value}
                    </Link> : <Link style={{ 
                        textDecoration : 'none',
                        color : 'black',
                        marginRight: '5px', 
                        fontSize : '6px'
                    }} key={i} to={link[i]} onClick={onClickLogout}>
                        {value}
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default withRouter(authT);
