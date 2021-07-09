import React from 'react'
import LikeButton from './Notice/LikeButton';
import TextArea from './Notice/TextArea';
import Comment from './Notice/Comment';
import CommentTable from './Notice/CommentTable';
import UpdateAndDeleteBtn from './Notice/UpdateAndDeleteBtn'
function NoticeDetail() {
    return (
        <>
            <TextArea />
            <UpdateAndDeleteBtn />
            <LikeButton />
            <CommentTable />
            <Comment />
        </>
    )
}

export default NoticeDetail