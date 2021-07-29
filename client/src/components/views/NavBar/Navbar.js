import React from 'react';
import AuthF from './section/AuthF';
import AuthT from './section/AuthT';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Div = styled.div`
    width : 100%;
    text-align : center;
    min-width : 480px;
    border-bottom : 0.25px solid #dcdcdc;
`;
function Navbar() {
    const token = useSelector(state => state.UserReducer.authToken);

    return (
        <Div>
            {token ? <AuthT /> : <AuthF />}
            <h1>
                <Link to='/' style={{ textDecoration :'none', color :'black'}}>JULOG</Link>
            </h1>
        </Div>
    )
}

export default Navbar;