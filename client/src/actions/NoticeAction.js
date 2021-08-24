import axios from 'axios';
import { 
    LOAD_NOTICE,
    LOAD_ONE_NOTICE,
    CREATE_NOTICE,
    UPDATE_NOTICE,
    LOAD_LIKE,
    ADD_LIKE,
    DELETE_LIKE,
    CREATE_NOTICE_COMMENT,
    LOAD_COMMENT,
    DELETE_NOTICE_COMMENT,
    DELETE_NOTICE,
    SEARCH_NOTICE,
    NOTICE_ERROR,
    LIKE_ERROR,
    LOAD_ONE_NOTICE_ERROR,
    LOAD_COMMENT_ERROR,
    LOAD_LIKE_ERROR,
} from './type';


//camelCase
export const loadNotice = () => async dispatch => {
    try {
        const res = await axios.get('/api/notice');
        return dispatch({
            type : LOAD_NOTICE,
            data : res.data.notices,
        });
    } catch (error) {
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
}

export const loadOneNotice = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}`);
        if(res.data.success){
            return dispatch({
                type : LOAD_ONE_NOTICE,
                data : res.data,
            });
        }
        return dispatch({
            type : LOAD_ONE_NOTICE_ERROR,
            data : res.data,
        })
    } catch (error) {
        return dispatch({
            type : NOTICE_ERROR,
            data : {
                success : false,
            }
        });
    }
}

export const loadComment = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}/comment`);
        if(res.data.success){
            return dispatch({
                type : LOAD_COMMENT,
                data : res.data 
            });
        }
        return dispatch({
            type : LOAD_COMMENT_ERROR,
            data : res.data 
        })
    } catch (error) {
        return dispatch({
            type : NOTICE_ERROR,
            data : {
                success : false,
            }
        });
    }
}
export const createNotice = data => async dispatch => {
    try {
        const res = await axios.post('/api/notice/', data);
        return dispatch({
            type : CREATE_NOTICE,
            success : res.data.success,
            data : res.data.notice,
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
    
}
export const updateNotice = data => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${data.id}/updatenotice`,data);
        return dispatch({
            type : UPDATE_NOTICE,
            success : res.data.success,
            data : res.data.notice,
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
};
export const deleteNotice = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/notice/${id}/deletenotice`);
        return dispatch({
            type : DELETE_NOTICE,
            data : res.data.success,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
}
export const searchNotice = (arr, text, type) => async dispatch => {
    try {
        let array = [];
        if(type === 'title'){
            array = await arr.filter((item) => {
                return item.title.indexOf(text) > -1;
            });
        }
        if(type === 'author'){
            array = await arr.filter((item) => {
                return item.author.nick.indexOf(text) > -1;
            })
        }
        return dispatch({
            type : SEARCH_NOTICE,
            data : array,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
}
export const createNoticeComment = data => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/comment`, data);
        return dispatch({
            type : CREATE_NOTICE_COMMENT,
            success : res.data.success,
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
    
}

export const loadLike = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}/like`);
        if(res.data.success){
            return dispatch({
                type : LOAD_LIKE,
                data : res.data,
            });
        }
        return dispatch({
            type : LOAD_LIKE_ERROR,
            data : res.data,
        })
    } catch (error) {
        return dispatch({
            type : LIKE_ERROR,
            data : {
                success : false,
            }
        });
    }
    
}

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${id}/addlike`);
        return dispatch({
            type : ADD_LIKE,
            data : res.data.notice.like.length,
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type : LIKE_ERROR,
        });
    }
    
}

export const deleteLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${id}/deletelike`);
        return dispatch({
            type : DELETE_LIKE,
            data : res.data.notice.like.length,
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type : LIKE_ERROR,
        });
    }
    
}

export const deleteNoticeComment = (commentId, noticeId) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${noticeId}/deletecomment`, {
            id : commentId
        });
        return dispatch({
            type : DELETE_NOTICE_COMMENT,
            data : res.data.comment
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : NOTICE_ERROR,
        });
    }
}