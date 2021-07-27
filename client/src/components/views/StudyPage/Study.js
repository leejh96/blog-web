import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MarkdownSection from '../Markdown/Markdown';
import { useParams } from 'react-router-dom';
import Comment from './section/Comment';
import CommentTable from './section/CommentTable';

const Content = styled.div`
    width : 100%;
    margin-top : 10px;
    padding-bottom : 10px;
`;

function Study() {
    document.title = 'STUDY'
    const { study } = useParams();
    const [page, setPage] = useState('');
    useEffect(() => {
        setPage(study);
    }, [study])
    return (
        <>
            <h2>{page}</h2>
            <Content>
                <MarkdownSection />
                <CommentTable />
                <Comment />
            </Content>
        </>
    )
}

export default Study
