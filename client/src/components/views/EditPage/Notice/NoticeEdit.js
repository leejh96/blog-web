import React from 'react'
import CreateContent from './section/CreateContent';
import UpdateContent from './section/UpdateContent';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Content = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 10px;
    padding-bottom : 10px;
    justify-content : space-around;
`;
function NoticeEdit() {
    const params = useParams();
    return (
        <>
            {params.id === undefined ?
            <>
                <h2>공지사항 작성</h2>
                <Content>
                    <CreateContent />
                </Content>
            </>
            :
            <>                        
                <h2>공지사항 수정</h2>
                <Content>
                    <UpdateContent />
                </Content>
            </>
            }
        </>
    )
}

export default NoticeEdit