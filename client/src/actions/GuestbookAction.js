import axios from 'axios';
import { CREATE_GUESTBOOK, DELETE_GUESTBOOK, LOAD_GUESTBOOK, GUESTBOOK_PAGENATION_COUNT } from './type';
//camelCase
export const createGuestBook =  data => async dispatch => {
    try {
        const res = await axios.post('/api/guestbook/', data);
        //dispatch를 한번더 사용하지 않는다면 reducer의 initialState 값이 변하지 않는다.
        return dispatch({
            type : CREATE_GUESTBOOK,
            data : res.data.createContent,
        })
    } catch (error) {
        console.error(error);
        return;
    }
}

export const deleteGuestBook = data => async dispatch => {
    try {
        const res = await axios.delete('/api/guestbook/', data);
        if (res.data.success){
            return dispatch({
                type : DELETE_GUESTBOOK,
                data : res.data.guestbook
            })
        }
        return alert(res.data.message);
    } catch (error) {
        console.error(error);
        return;
    }
};

export const loadGuestBook = () => async dispatch => {
    try {
        const res = await axios.get('/api/guestbook/');
        return dispatch({
            type : LOAD_GUESTBOOK,
            data : res.data.guests
        })
    } catch (error) {
        console.error(error);
        return ;
    }
};

export const pagenation = (url) => async dispatch => {
    try {
        const res = await axios.get(url);
        return dispatch({
            type : GUESTBOOK_PAGENATION_COUNT,
            pageArr : res.data.pageArr,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
};