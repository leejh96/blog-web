import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../actions/UserAction';
const Lists = () => {
    return [
        {
            tag : "내 정보",
            link : "/mySetting",
        },
        {
            tag : '로그아웃',
            link : '#'
        }
    ];
}

function AuthT() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(Lists);
    }, [])

    const onClickLogout = () => {
        dispatch(logoutUser())
        .then(res => {
            if(res.data.success){
                localStorage.removeItem('auth');
                return history.push('/login');
            }
            if(!res.data.auth){
                localStorage.removeItem('auth');
                alert(res.data.message);
                return history.push('/login')
            }
            alert(res.data.message);
            return history.push('/login')
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

export default AuthT;
