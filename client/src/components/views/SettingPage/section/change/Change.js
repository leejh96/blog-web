import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Nick from './section/Nick';
import Password from './section/Password';
import Resign from './section/Resign';
function Change() {
    const change = useParams().change;
    const [title, setTitle] = useState('');
    useEffect(() => {
        switch(change){
            case 'nick':
                return setTitle('닉네임 변경');
            case 'password':
                return setTitle('비밀번호 변경');
            case 'resign':
                return setTitle('회원탈퇴');
            default : return;
        }
    }, [change])

    return (
        <>
            <h2>{title}</h2>
            {change === 'nick' ?
                <Nick /> 
                :
                change === 'password' ?
                <Password />
                :
                <Resign />
            }
        </>
    )
}

export default Change
