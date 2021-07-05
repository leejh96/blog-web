import React from 'react'
import styled from 'styled-components';

const Load = styled.div`
    position : relative;
    text-align :  center;
    padding : 30%;
    font-size : 2rem;
`;

function Loading() {
    return (
        <Load>
            로딩중 ...
        </Load>
    )
}

export default Loading
