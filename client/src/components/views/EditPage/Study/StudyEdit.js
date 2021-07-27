import React from 'react';
import styled from 'styled-components';
import MarkdownEditor from '../../Markdown/MarkdownEditor';
import { useParams } from 'react-router-dom';
const Content = styled.div`
    width : 100%;
    margin-top : 10px;
    padding-bottom : 10px;
`;
function StudyEdit() {
    const {study} = useParams();
    return (
        <>
            <h2>{study}</h2>
            <Content>
                <MarkdownEditor page={study}/>
            </Content>
        </>
    )
}

export default StudyEdit;
