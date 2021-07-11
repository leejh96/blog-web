import axios from 'axios';
import { 
    CREATE_STUDY,
    LOAD_STUDY, 
    DELETE_STUDY, 
    LOAD_ONE_STUDY,
    UPDATE_STUDY_TEXT,
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
        return;
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
        return ;
    }
}

export const loadOneStudy = page => async dispatch => {
    try {
        const res = await axios.get(`/api/study/${page}`);
        return dispatch({
            type : LOAD_ONE_STUDY,
            data : res.data.page,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
}

export const updateStudyText = ( page, text )=> async dispatch => {
    try {
        const data = { text };
        const res = await axios.put(`/api/study/${page}`, data);
        return dispatch({
            type : UPDATE_STUDY_TEXT
        })
    } catch (error) {
        console.error(error);
        return ;
    }
};

export const deleteStudy = id => async dispatch => {
    try {
        const data = { data : { id }};
        const res = await axios.delete('/api/study', data);
        return dispatch({
            type : DELETE_STUDY,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
}
