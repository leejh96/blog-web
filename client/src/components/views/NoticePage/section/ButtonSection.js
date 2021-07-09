import React from 'react'
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const BtnArea = styled.div`
    display: flex;
    justify-content : flex-end;
`;

const BtnLink = styled(Link)`
    text-decoration : none;
    color : black;
`;

function ButtonSection() {
    return (
        <BtnArea>
          <BtnLink to='/notice/edit'><Button variant="contained">글작성</Button></BtnLink>  
        </BtnArea>
    )
}

export default ButtonSection