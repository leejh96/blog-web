import React from 'react'
import styled from 'styled-components';

const LaterPage = styled.div`
    position : relative;
    text-align :  center;
    padding : 30%;
    font-size : 2rem;
`;


function Later() {
    return (
        <LaterPage>
            추후에 서비스 하겠습니다.
        </LaterPage>
    )
}

export default Later
