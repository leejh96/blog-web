import axios from 'axios';
import { 
    CREATE_STUDY,
    LOAD_STUDY, 
    DELETE_STUDY, 
    LOAD_ONE_STUDY,
    UPDATE_STUDY_TEXT,
    STUDY_ERROR,
    CREATE_STUDY_COMMENT,
    DELETE_STUDY_COMMENT,
    LOAD_STUDY_COMMENT,
    STUDY_COMMENT_ERROR,
    LOAD_RECENT_STUDY,
    LOAD_ONE_STUDY_ERROR,
    LOAD_STUDY_COMMENT_ERROR,
} from './type';
//camelCase
export const createStudy = text => async dispatch => {
    try {
        const data = { text }
        const res = await axios.post('/api/study', data);
        return dispatch({
            type : CREATE_STUDY,
            data : res.data.study,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_ERROR,
        });
    }
}

export const loadStudy = () => async dispatch => {
    try {
        const res = await axios.get('/api/study');
        return dispatch({
            type : LOAD_STUDY,
            data : res.data.studies,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_ERROR,
        });
    }
}

export const loadRecentStudy = () => async dispatch => {
    try {
        const res = await axios.get('/api/study/recent');
        return dispatch({
            type : LOAD_RECENT_STUDY,
            data : res.data.studies,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_ERROR,
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
            type : STUDY_ERROR,
        });
    }
}

export const updateStudyText = ( page, text )=> async dispatch => {
    try {
        const data = { text };
        await axios.put(`/api/study/${page}`, data);
        return dispatch({
            type : UPDATE_STUDY_TEXT
        })

    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_ERROR
        })
    }
};

export const deleteStudy = id => async dispatch => {
    try {
        const data = { data : { id }};
        await axios.delete('/api/study', data);
        return dispatch({
            type : DELETE_STUDY,
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_ERROR
        })
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
        console.error(error);
        return dispatch({
            type : STUDY_COMMENT_ERROR,
        });
    }
}

export const createStudyComment = data => async dispatch => {
    try {
        const res = await axios.put(`/api/study/${data.study}/comment`, { 
            comment : data.comment,
            date : data.date,
        });
        return dispatch({
            type : CREATE_STUDY_COMMENT,
            success : res.data.success,
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_COMMENT_ERROR,
        });
    }
    
}

export const deleteStudyComment = (commentId, study) => async dispatch => {
    try {
        const res = await axios.put(`/api/study/${study}/deletecomment`, {
            id : commentId
        });
        return dispatch({
            type : DELETE_STUDY_COMMENT,
            data : res.data.comment
        })
    } catch (error) {
        console.error(error);
        return dispatch({
            type : STUDY_COMMENT_ERROR,
        });
    }
}