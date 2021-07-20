import React from 'react'
import styled from 'styled-components';

const TextContent = styled.div`
    text-align : center;
    padding : 15% 0 5% 0;
    font-size : 3rem;
`;
const TextAuthor = styled.div`
    font-size : 3rem;
    text-align : center;
`;

function Text() {
    return (
        <>
            <TextContent>
                우리의 인생은<br /> 우리가 노력한 만큼<br /> 가치가 있다.
            </TextContent>
            <TextAuthor>
                -모리악-
            </TextAuthor>
        </>
    )
}

export default Text
