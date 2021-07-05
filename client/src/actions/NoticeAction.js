import axios from 'axios';
import { LOAD_NOTICE, CREATE_NOTICE } from './type';
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