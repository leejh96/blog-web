import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authUser, isLoggedIn } from '../actions/UserAction';
function Auth(Component, option, adminRoute = null) {
    //component => hoc를 적용할 컴포넌트
    //option => null: 아무나 출입,
    //          true => 로그인유저만 출입,
    //          false => 로그인 한 유저는 출입불가
    //adminRoute => true : admin User만 출입
    function AuthenticationCheck(){
        const dispatch = useDispatch();
        const history = useHistory();
        useEffect(() => {
            if(localStorage.getItem('access')){
                dispatch(authUser(localStorage.getItem('access')))
                .then(res => {
                    if(res.data.expire){
                        localStorage.clear();
                        alert('세션 만료! 재로그인 해주세요');
                        return history.push('/login');
                    }
                    localStorage.setItem('access', res.data.token);
                    //로그인 한 상태 중 관리자가 아닌사람이
                    //adminpage를 들어가려할때
                    if(adminRoute && res.data.user.role !== 3){
                        return history.push('/');
                    }
                    if(option === false){
                        return history.push('/');
                    }
                })
            }
            else{
                dispatch(isLoggedIn())
                .then(res => {
                    if(!res.data.auth){
                        if(option || adminRoute){
                            return history.push('/login');
                        }
                    }else{
                        if(option === false || adminRoute){
                            return history.push('/');
                        }
                    }
                })
            }
            return () => {}
        }, [dispatch, history])

        return (
            <Component />
        )
    }
    return (
        AuthenticationCheck
    )
}

export default Auth
