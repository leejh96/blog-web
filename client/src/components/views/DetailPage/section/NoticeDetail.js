import React, {Fragment} from 'react'
import LikeButton from './Notice/LikeButton';
import TextArea from './Notice/TextArea';
import Comment from './Notice/Comment';
import CommentTable from './Notice/CommentTable';
import UpdateAndDeleteBtn from './Notice/UpdateAndDeleteBtn'
import { useSelector } from 'react-redux';
function NoticeDetail() {
    const user = useSelector(state => state.UserReducer.user);
    return (
        <Fragment>
            <TextArea />
            { user.role === 3 ? <UpdateAndDeleteBtn /> : <Fragment></Fragment>}
            <LikeButton />
            <CommentTable />
            <Comment />
        </Fragment>
    )
}

export default NoticeDetail