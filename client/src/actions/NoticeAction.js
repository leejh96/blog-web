import axios from 'axios';
import { 
    LOAD_NOTICE,
    LOAD_ONE_NOTICE,
    CREATE_NOTICE,
    LOAD_LIKE,
    ADD_LIKE,
    DELETE_LIKE
} from './type';
//camelCase
export const loadNotice = () => async dispatch => {
    try {
        const res = await axios.get('/api/notice/');
        return dispatch({
            type : LOAD_NOTICE,
            data : res.data.notices,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
}

export const loadOneNotice = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}`);
        console.log(res);
        return dispatch({
            type : LOAD_ONE_NOTICE,
            data : res.data.notice,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
}

export const createNotice = data => async dispatch => {
    try {
        const res = await axios.post('/api/notice/', data);
        return dispatch({
            type : CREATE_NOTICE,
            success : res.data.success,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const loadLike = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}`);
        return dispatch({
            type : LOAD_LIKE,
            count : res.data.notice.like.length,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.update(`/api/notice/${id}/addlike`, {
            id
        });
        console.log(res);
        return dispatch({
            type : ADD_LIKE,
            data : res.data.notice.like,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const deleteLike = () => async dispatch => {
    try {
        const res = await axios.get('/api/notice/');
        return dispatch({
            type : LOAD_NOTICE,
            data : res.data.notices,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}