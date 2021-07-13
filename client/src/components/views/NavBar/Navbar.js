import React, { useEffect, useState } from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link } from 'react-router-dom';
import { loadCookie } from '../../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
function Navbar() {
    const [user, setUser] = useState('');
    const auth = useSelector(state => state.UserReducer.authToken);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCookie(localStorage.getItem('auth')))
        .then(res => {
            if(res.data && localStorage.getItem('auth')){
                return setUser(localStorage.getItem('auth'))
            }
            localStorage.removeItem('auth');
            return setUser('');
        })
    }, [dispatch, auth])
    
    return (
        <div align='center' >
            {user ? <AuthT /> : <AuthF />}
            <h1>
                <Link to='/' style={{ textDecoration :'none', color :'black'}}>주혁's 블로그</Link>
            </h1>
        </div>
    )
}

export default Navbar;