import React, { useState, useEffect } from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';

function Navbar() {
    const [user, setUser] = useState(localStorage.getItem('auth'));
    
    return (
        <div align='center'>
            {user ? <AuthT /> : <AuthF />}
            <h1>
                주혁's 블로그
            </h1>
        </div>
    )
}

export default Navbar;