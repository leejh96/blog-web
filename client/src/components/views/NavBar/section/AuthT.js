import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router-dom';
function authT(props) {
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
        <>
            <li><a href="/#">내 정보</a></li>
            <li><button onClick={onClickLogout}>로그아웃</button></li>  
        </>
    )
}

export default withRouter(authT);
