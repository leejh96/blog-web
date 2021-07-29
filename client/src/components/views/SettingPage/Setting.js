import React from 'react';
import Main from './section/main/Main';
import Change from './section/change/Change';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
    min-width : 768px;
`;

function Setting() {
    document.title = 'SETTING'
    const params = useParams();
    return (
        <Div>
            {!params.change ? <Main /> : <Change />}
        </Div>
    )
}

export default Setting;