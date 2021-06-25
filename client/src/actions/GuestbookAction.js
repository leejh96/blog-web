import axios from 'axios';
import { CREATE_GUESTBOOK } from './type';
//camelCase
export const createGuestBook =  data => async dispatch => {

    // const request = axios.post('/api/guestbook/',data)
    // .then(response => response.data);

    // return {
    //     type: CREATE_GUESTBOOK,
    //     data: request
    // }

    const value = await axios.post('/api/guestbook/', data);
    return {
        type : CREATE_GUESTBOOK,
        data : value.data,
    }

}