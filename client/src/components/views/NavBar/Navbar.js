import React, { useEffect, useState } from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
function Navbar() {
    const [user, setUser] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        setUser(localStorage.getItem('access'));
    }, [dispatch,  user])

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