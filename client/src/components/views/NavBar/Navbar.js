import React from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Navbar() {
    const token = useSelector(state => state.UserReducer.authToken);

    return (
        <div align='center' >
            {token ? <AuthT /> : <AuthF />}
            <h1>
                <Link to='/' style={{ textDecoration :'none', color :'black'}}>JULOG</Link>
            </h1>
        </div>
    )
}

export default Navbar;