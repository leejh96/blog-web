import React, { useState } from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link } from 'react-router-dom';
function Navbar() {
    let [user, setUser] = useState(localStorage.getItem('auth'));
    
    return (
        <div align='center'>
            {user ? <AuthT /> : <AuthF />}
            <h1>
                <Link to='/' style={{ textDecoration :'none', color :'black'}}>주혁's 블로그</Link>
            </h1>
        </div>
    )
}

export default Navbar;