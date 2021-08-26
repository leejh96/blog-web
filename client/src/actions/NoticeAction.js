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
    LOAD_ONE_NOTICE_ERROR,
    LOAD_COMMENT_ERROR,
    LOAD_LIKE_ERROR,
    SERVER_ERROR,
    LOAD_NOTICE_ERROR,
    AUTH_ERROR,
    LOAD_ONE_NOTICE_VALID_ERROR,
    LOAD_COMMENT_VALID_ERROR,
    CREATE_NOTICE_ERROR,
    UPDATE_NOTICE_ERROR,
    DELETE_NOTICE_ERROR,
    CREATE_NOTICE_COMMENT_ERROR,
    LOAD_LIKE_VALID_ERROR,
    ADD_LIKE_ERROR,
    DELETE_LIKE_ERROR,
    DELETE_NOTICE_COMMENT_ERROR,
} from './type';


//camelCase
export const loadNotice = () => async dispatch => {
    try {
        const res = await axios.get('/api/notice');
        if(res.data.success){
            return dispatch({
                type : LOAD_NOTICE,
                data : res.data.notices,
            });
        }
        return dispatch({
            type : LOAD_NOTICE_ERROR,
            data : res.data.message
        })
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
}

export const loadOneNotice = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}`);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : LOAD_ONE_NOTICE,
                data : res.data,
            });
        }
        if(!res.data.success && res.data.auth && res.data.valid){
            return dispatch({
                type : LOAD_ONE_NOTICE_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth && !res.data.valid){
            return dispatch({
                type : LOAD_ONE_NOTICE_VALID_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
}

export const loadComment = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}/comment`);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : LOAD_COMMENT,
                data : res.data 
            });
        }
        if(!res.data.success && res.data.auth && res.data.valid){
            return dispatch({
                type : LOAD_COMMENT_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth && !res.data.valid){
            return dispatch({
                type : LOAD_COMMENT_VALID_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
}
export const createNotice = data => async dispatch => {
    try {
        const res = await axios.post('/api/notice', data);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : CREATE_NOTICE,
                data : res.data,
            });
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : CREATE_NOTICE_ERROR,
                data : res.data,
            });
        }
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
    
}
export const updateNotice = data => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${data.id}/updatenotice`,data);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_NOTICE,
                data : res.data 
            });
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_NOTICE_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
};
export const deleteNotice = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/notice/${id}/deletenotice`);
        if(res.data.auth && res.data.success){
            return dispatch({
                type : DELETE_NOTICE,
                data : res.data,
            })
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : DELETE_NOTICE_ERROR,
                data : res.data,
            })
        }
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
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
        if(res.data.auth && res.data.success){
            return dispatch({
                type : CREATE_NOTICE_COMMENT,
                data : res.data,
            });
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : CREATE_NOTICE_COMMENT_ERROR,
                data : res.data,
            })
        }
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
    
}

export const loadLike = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}/like`);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : LOAD_LIKE,
                data : res.data,
            });
        }
        if(!res.data.success && res.data.auth && res.data.valid){
            return dispatch({
                type : LOAD_LIKE_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth && !res.data.valid){
            return dispatch({
                type : LOAD_LIKE_VALID_ERROR,
                data : res.data,
            })
        }
        if(!res.data.success && !res.data.auth){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
    
}

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${id}/addlike`);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : ADD_LIKE,
                data : res.data,
            });
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : ADD_LIKE_ERROR,
                data : res.data,
            });
        }
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
    
}

export const deleteLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${id}/deletelike`);
        if(res.data.auth && res.data.success){
            return dispatch({
                type : DELETE_LIKE,
                data : res.data,
            });
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : DELETE_LIKE_ERROR,
                data : res.data
            })
        }
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
    
}

export const deleteNoticeComment = (commentId, noticeId) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${noticeId}/deletecomment`, {
            id : commentId
        });
        if(res.data.auth && res.data.success){
            return dispatch({
                type : DELETE_NOTICE_COMMENT,
                data : res.data
            })
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : DELETE_NOTICE_COMMENT_ERROR,
                data : res.data,
            })
        }
        if(!res.data.auth && !res.data.success){
            return dispatch({
                type : AUTH_ERROR,
                data : res.data,
            })
        }
    } catch (error) {
        return dispatch({
            type : SERVER_ERROR,
            data : {
                success : false,
            }
        });
    }
}