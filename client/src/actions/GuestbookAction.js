import axios from 'axios';
import { CREATE_GUESTBOOK } from './type';
//camelCase
export const createGuestBook =  data => async (dispatch) => {
    const value = await axios.post('/api/guestbook/', data);
    //dispatch를 한번더 사용하지 않는다면 reducer의 initialState 값이 변하지 않는다.
    return dispatch({
        type : CREATE_GUESTBOOK,
        data : value.data,
    })
}