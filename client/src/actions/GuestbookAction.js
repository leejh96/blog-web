import axios from 'axios';
import { CREATE_GUESTBOOK, DELETE_GUESTBOOK, LOAD_GUESTBOOK, GUESTBOOK_PAGENATION_COUNT } from './type';
//camelCase
export const createGuestBook =  data => async dispatch => {
    try {
        const guests = await axios.post('/api/guestbook/', data);
        //dispatch를 한번더 사용하지 않는다면 reducer의 initialState 값이 변하지 않는다.
        return dispatch({
            type : CREATE_GUESTBOOK,
            data : guests.data.createContent,
        })
    } catch (error) {
        console.error(error);
        return;
    }
}

export const deleteGuestBook = data => async dispatch => {
    try {
        const delGuestbook = await axios.delete('/api/guestbook/', data);
        if (delGuestbook.data.success){
            return dispatch({
                type : DELETE_GUESTBOOK,
                data : delGuestbook.data.guestbook
            })
        }
        return alert(delGuestbook.data.message);
    } catch (error) {
        console.error(error);
        return;
    }
};

export const loadGuestBook = () => async dispatch => {
    try {
        const loads = await axios.get('/api/guestbook/')
        return dispatch({
            type : LOAD_GUESTBOOK,
            data : loads.data.guests
        })
    } catch (error) {
        console.error(error);
        return ;
    }
};

export const pagenation = (url) => async dispatch => {
    try {
        const pageCnt = await axios.get(url);
        return dispatch({
            type : GUESTBOOK_PAGENATION_COUNT,
            pageArr : pageCnt.data.pageArr,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
};