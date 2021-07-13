import React, { useEffect, useState } from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link, useHistory } from 'react-router-dom';
import { loadCookie } from '../../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';
function Navbar() {
    const [user, setUser] = useState('');
    // const auth = useSelector(state => state.UserReducer.authToken);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        setUser(localStorage.getItem('access'));
        dispatch(loadCookie(user))
        .then(res => {
            if(res.data.success){
               return setUser(res.data.token);
            }
            localStorage.clear();
            alert(res.data.message);
            return history.push('/login'); 
        })
    }, [dispatch, history, user])

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