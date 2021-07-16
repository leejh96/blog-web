import React from 'react'
import LikeButton from './Notice/LikeButton';
import TextArea from './Notice/TextArea';
import Comment from './Notice/Comment';
import CommentTable from './Notice/CommentTable';
import UpdateAndDeleteBtn from './Notice/UpdateAndDeleteBtn'
import { useSelector } from 'react-redux';
function NoticeDetail() {
    const user = useSelector(state => state.UserReducer.user);
    return (
        <>
            <TextArea />
            { user.role === 3 ? <UpdateAndDeleteBtn /> : <></>}
            <LikeButton />
            <CommentTable />
            <Comment />
        </>
    )
}

export default NoticeDetail