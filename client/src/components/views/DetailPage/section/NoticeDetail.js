import React from 'react'
import LikeButton from './Notice/LikeButton';
import TextArea from './Notice/TextArea';
import Comment from './Notice/Comment';
import CommentTable from './Notice/CommentTable';
function NoticeDetail() {
    return (
        <>
            <TextArea />
            <LikeButton />
            <CommentTable />
            <Comment />
        </>
    )
}

export default NoticeDetail