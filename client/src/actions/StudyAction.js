import axios from 'axios';
import { 
    CREATE_STUDY,
    LOAD_STUDY, 
    DELETE_STUDY, 
    LOAD_ONE_STUDY,
    UPDATE_STUDY_TEXT,
    CREATE_STUDY_COMMENT,
    DELETE_STUDY_COMMENT,
    LOAD_STUDY_COMMENT,
    LOAD_RECENT_STUDY,
    LOAD_ONE_STUDY_ERROR,
    LOAD_STUDY_COMMENT_ERROR,
    CREATE_STUDY_ERROR,
    AUTH_ERROR,
    SERVER_ERROR,
    LOAD_STUDY_ERROR,
    LOAD_RECENT_STUDY_ERROR,
    UPDATE_STUDY_TEXT_ERROR,
    DELETE_STUDY_ERROR,
    CREATE_STUDY_COMMENT_ERROR,
    DELETE_STUDY_COMMENT_ERROR,
} from './type';
//camelCase
export const createStudy = text => async dispatch => {
    try {
        const data = { text }
        const res = await axios.post('/api/study', data);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : CREATE_STUDY,
                data : res.data.study,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : CREATE_STUDY_ERROR,
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

export const loadStudy = () => async dispatch => {
    try {
        const res = await axios.get('/api/study');
        if(res.data.success){
            return dispatch({
                type : LOAD_STUDY,
                data : res.data.studies,
            })
        }
        return dispatch({
            type : LOAD_STUDY_ERROR,
            data : res.data,
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

export const loadRecentStudy = () => async dispatch => {
    try {
        const res = await axios.get('/api/study/recent');
        if(res.data.success){
            return dispatch({
                type : LOAD_RECENT_STUDY,
                data : res.data.studies,
            })
        }
        return dispatch({
            type : LOAD_RECENT_STUDY_ERROR,
            data : res.data,
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

export const loadOneStudy = page => async dispatch => {
    try {
        const res = await axios.get(`/api/study/${page}`);
        if(res.data.success){
            return dispatch({
                type : LOAD_ONE_STUDY,
                data : res.data,
            })
        }
        return dispatch({
            type : LOAD_ONE_STUDY_ERROR,
            data : res.data
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

export const updateStudyText = ( page, text )=> async dispatch => {
    try {
        const data = { text };
        const res = await axios.put(`/api/study/${page}`, data);
        
        if(res.data.auth && res.data.success){
            return dispatch({
                type : UPDATE_STUDY_TEXT,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            return dispatch({
                type : UPDATE_STUDY_TEXT_ERROR,
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

export const deleteStudy = id => async dispatch => {
    try {
        const data = { data : { id }};
        const res = await axios.delete('/api/study', data);
        if(res.data.success && res.data.auth){
            return dispatch({
                type : DELETE_STUDY,
                data : res.data,
            })
        }
        if(!res.data.success && res.data.auth){
            dispatch({
                type : DELETE_STUDY_ERROR,
                data : res.data,
            })

        }
        if(!res.data.success && !res.data.auth){
            dispatch({
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

export const loadStudyComment = study => async dispatch => {
    try {
        const res = await axios.get(`/api/study/${study}/comment`);
        if(res.data.success){
            return dispatch({
                type : LOAD_STUDY_COMMENT,
                data : res.data,
            });
        }
        return dispatch({
            type : LOAD_STUDY_COMMENT_ERROR,
            data : res.data,
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

export const createStudyComment = data => async dispatch => {
    try {
        const res = await axios.put(`/api/study/${data.study}/comment`, { 
            comment : data.comment,
            date : data.date,
        });
        if(res.data.auth && res.data.success){
            return dispatch({
                type : CREATE_STUDY_COMMENT,
                data : res.data,
            });
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : CREATE_STUDY_COMMENT_ERROR,
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

export const deleteStudyComment = (commentId, study) => async dispatch => {
    try {
        const res = await axios.put(`/api/study/${study}/deletecomment`, {
            id : commentId
        });
        if(res.data.auth && res.data.success){
            return dispatch({
                type : DELETE_STUDY_COMMENT,
                data : res.data.comment
            });
        }
        if(res.data.auth && !res.data.success){
            return dispatch({
                type : DELETE_STUDY_COMMENT_ERROR,
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